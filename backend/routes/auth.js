import User, { comparePassword, saveNewUser, hashUserPassword } from '../models/user';
import express from 'express';
import { check, validationResult } from 'express-validator';
import { genEmailToken } from '../other/tokens';
import validator from 'validator';

const router = express.Router();

//Trims all objects in request body, if is a string then will also sanitize the string value
const trimReqBody = async (body) => {
    Object.keys(body).map((key) => {
        body[key] = typeof body[key] === 'string' && key !== 'password' ? validator.trim(validator.blacklist(body[key], '<>$')) : validator.trim(body[key])
    })
    return body;
}

//Registration route.
router.post('/register',
    [check('email', 'Please enter a valid email address').exists().isEmail().custom( async (value, { req }) => {
        let account = await findByEmail(validator.normalizeEmail(req.body.email));
        if(account.length > 0){
            throw new Error("Email already in use!")
        }else{
            return true;
        }
    }),
    check('password', 'Make sure your password is at least 8 characters long!').exists().isLength(8)], (req, res, next) => {
    const email = validator.normalizeEmail(req.body.email);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        res.json({success: false, message: errors.array()[0].msg});
    }else{
        trimReqBody(req.body).then((body) => {
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
                        res.json({user: savedUser})
                    }).catch(next);
                }).catch(next);
            }).catch(next);
        }).catch(next);

    }
})

const findByEmail = async (emailAddress) => {
    return await User.find({email: emailAddress});
}

export default router;