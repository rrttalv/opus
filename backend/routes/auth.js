import * as User from '../models/user';
import express from 'express';

const router = express.Router();

router.post('/register', (req, res, next) => {
    const email = req.body.email;
    console.log(req.body)
    /*
    findByEmail(email).then((user) => {
        if(user){
            res.status(400).json({status: false, message: "Email already in use!"});
        }else{
            res.json({status: true, message: "User account created"})
        }
    }).catch(next);*/
})

const findByEmail = async (emailAddress) => {
    return await User.findOne({email: emailAddress});
}

export default router;