import User, { comparePassword, saveNewUser, hashUserPassword } from '../models/user';
import express from 'express';
import { check, validationResult } from 'express-validator';
import { genEmailToken, genForgotToken } from '../other/tokens';
import validator from 'validator';
import config from 'config';
import jsonwebtoken from 'jsonwebtoken';
import { trimAndSanitize } from '../other/sanitize';
import { authUser } from '../other/middleware';
import { sendVerifyEmail, renderVerifyEmail, 
        renderForgotEmail, sendForgotEmail } from '../other/sendEmail';
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
        if(account){
            throw new Error("Email already in use!");
        }else{
            return true;
        }
    }),
    check('password', 'Make sure your password is at least 8 characters long!').exists().isLength(8)], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        let message = errors.array()[0].msg;
        res.status(400).json({message: message});
    }else{
        trimAndSanitize(req.body).then((body) => {
            //Generate verification token
            genEmailToken().then((token) => {
                let newUser = new User({
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email.toLowerCase(),
                    password: body.password,
                    confirm_token: token
                })
                //Hash password
                hashUserPassword(newUser).then((hashedUser) => {
                    saveNewUser(hashedUser).then((savedUser) => {
                        /* 
                            Send email to user. Can only send free emails to domains with verified sender signature. 
                            Currently verified: pohi.io
                        */
                        renderVerifyEmail(savedUser.confirm_token, `http://localhost:3000/verify`).then((template) => {
                            sendVerifyEmail(template, 'ricotalvar@pohi.io').then(() => {
                                res.json(savedUser)
                            }).catch(next);
                        }).catch(next); 
                    }).catch(next);
                }).catch(next);
            }).catch(next);
        }).catch(next);
    }
});

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
        if(account){
            let passwordMatch = await comparePassword(req.body.password, account.password);
            if(!passwordMatch){
                throw new Error("Wrong email or password");
            }
            return passwordMatch;
        }
        return true;
    })], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        let message = errors.array()[0].msg;
        res.status(400).json({message: message});
    }else{
        trimAndSanitize(req.body).then((body) => {
            findByEmail(body.email).then((user) => {
                if(!user.confirm_token){
                    addLoginLog(user.id).then(() => {
                        const id_token = jsonwebtoken.sign({user: user}, config.get('jwtS'), {expiresIn: 604800000});
                        res.json({token: id_token, user: user})
                    }).catch(next);
                }else{
                    res.status(400).json({message: "Please confirm your email address"})
                }
            }).catch(next);
        }).catch(next);
    }
});

router.put('/verify/:authToken', (req, res, next) => {
    /*
        Gets users authentication token from params and sets the user's email status to verified or sends error.
    */
   trimAndSanitize({token: req.params.authToken}).then((sanitizedToken) => {
        findByVerifyToken(sanitizedToken.token).then((user) => {
            if(!user){
                res.status(400).json({message: "Invalid token"});
            }else{
                verifyUserEmail(user._id).then(() => {
                    res.json(true)
                }).catch(next);
            }
        }).catch(next);
   }).catch(next);
});

router.post('/reset', (req, res, next) => {
    /*
        Generates and sends user an email with reset password url.
    */
   genForgotToken().then((token) => {
       trimAndSanitize(req.body).then((sanitizedBody) => {
            setForgotPasswordToken(sanitizedBody.email.toLowerCase(), token).then((user) => {
                renderForgotEmail(`http://localhost:3000/reset?resetToken=${token}`).then((template) => {
                    sendForgotEmail(template, 'ricotalvar@pohi.io').then(() => {
                        res.json(true);
                    }).catch(next);
                }).catch(next);
            }).catch((err) => {
                //Will "send" a token to user. This way cant check if user with email exists or not.
                console.log(err);
                res.json(true);
            });
       }).catch(next);
   }).catch(next);
})

router.get('/signed', authUser, (req, res, next) => {
    /*
        Validates the JWT token
    */
    findByEmail(req.user.email).then((user) => {
        if(user){
            res.json(user);
        }
    }).catch(next);
});

const addLoginLog = async (id) => {
    /*
        Push a date into the user login log array. 
    */
    let currentDate = new Date().toISOString()
    return await User.updateOne({_id: id}, {$push: {'login_count': currentDate}});
};

const findByEmail = async (emailAddress) => {
    /*
        Async function to find one user by their email field.
    */
    return await User.findOne({email: emailAddress});
};

const findByVerifyToken = async (token) => {
    /*
        Async function which finds user by their email token field.
    */
   return await User.findOne({'confirm_token': token})
}

const verifyUserEmail = async (userID) => {
    /*
        Function which nulls the confirm_token field on a user object enabling login.
    */
   return await User.updateOne({_id: userID}, {$unset: {'confirm_token': undefined}});
}

const setForgotPasswordToken = async (emailAddress, token) => {
    /*
        Updates user object with a reset password token
    */
   return await User.findOneAndUpdate({email: emailAddress}, {$set: {forgot_token: token}})
}

export default router;