import User from '../models/user';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { authUser } from '../other/middleware';
import validator from 'validator';
import config from 'config';
import { trimAndSanitize } from '../other/sanitize';

const router = express.Router();

router.get('/', (req, res, next) => {
})

router.get('/users/:page', authUser, (req, res, next) => {
    /*
    This route returns all the registered users. Only accessible to authenticated users.
    Hardcoded limit per page is 25.
    */
    let limit = 25;
    let page = req.params.page || 0;
    findAllUsers(limit*page).then((userList) => {
        res.json(userList)
    }).catch(next);
});

//
router.put('/users/delete/:id', authUser, (req, res, next) => {
    /*
    This route enables a user to delete a user account.
    */
    
});

const findAllUsers = async (skip) => {
    return await User.find().skip(skip);
}


export default router;