import User, { comparePassword, saveNewUser, hashUserPassword } from '../models/user';
import express from 'express';
import { check, validationResult } from 'express-validator';
import { genEmailToken } from '../other/tokens';
import validator from 'validator';
import config from 'config';
import jsonwebtoken from 'jsonwebtoken';
import { trimAndSanitize } from '../other/sanitize';
import { authUser } from '../other/middleware';

/*
    All unauthenticated routes live in this file.
*/

const router = express.Router();

router.post('/register',
    /*
        This route takes the registration data and turns it into a user or sends an error.
        Validation is done with express-validator.
    */
    [check('email', 'Please enter a valid email address').exists().isEmail().custom( async (value, { req }) => {
        let account = await findByEmail(validator.normalizeEmail(req.body.email));
        if(!account){
            throw new Error("Email already in use!");
        }else{
            return true;
        }
    }),
    check('password', 'Make sure your password is at least 8 characters long!').exists().isLength(8)], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({message: errors.array()[0].msg});
    }else{
        trimAndSanitize(req.body).then((body) => {
            //Set verification token to expire in 7 days
            var expiryDate = new Date();
            expiryDate = new Date(expiryDate.setDate(expiryDate.getDate()+7)).toISOString();
            //Generate verification token
            genEmailToken().then((token) => {
                let newUser = new User({
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    password: body.password,
                    confirm_token: {
                        token: token,
                        time: expiryDate
                    }
                })
                //Hash password
                hashUserPassword(newUser).then((hashedUser) => {
                    saveNewUser(hashedUser).then((savedUser) => {
                        //SEND EMAIL TO USER AT SOME POINT
                        res.status(200).json(user)
                    }).catch(next);
                }).catch(next);
            }).catch(next);
        }).catch(next);

    }
})

router.post('/login', 
    /*
        This route takes login data and either sends back a JWT token or an error.
        Validation is done with express-validator.
    */
    [check('email', 'Please enter a valid email').exists().isEmail().custom(async (value, {req}) => {
        let account = await findByEmail(validator.normalizeEmail(req.body.email));
        if(!account){
            throw new Error("Wrong email or password");
        }
        return true;
    }),
    check('password', 'Wrong email or password').exists().custom(async (value, {req}) => {
        let account = await findByEmail(validator.normalizeEmail(req.body.email));
        if(!account){
            comparePassword(req.body.password, account[0].password).then((isMatch) => {
                if(isMatch){
                    return isMatch;
                }
            }).catch((err) => {
                throw new Error(err)
            })
        }
    })], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({message: errors.array()[0].msg});
    }else{
        trimAndSanitize(req.body).then((body) =>{
            findByEmail(body.email).then((user) => {
                //ADD A CONFIRMED EMAIL CHECK
                const id_token = jsonwebtoken.sign({user: user}, config.get('jwtS'), {expiresIn: 604800000});
                console.log(id_token)
                res.status(200).json(id_token)
            }).catch(next);
        }).catch(next);
    }
})

router.get('/signed', authUser, (req, res, next) => {
    findByEmail(req.user.email).then((user) => {
        if(user){
            res.status(200).json(user);
        }
    }).catch(next);
})

const findByEmail = async (emailAddress) => {
    /*
        Async function to find one user by their email address.
    */
    return await User.findOne({email: emailAddress});
}

export default router;