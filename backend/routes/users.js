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

router.get('/:page', authUser, (req, res, next) => {
    /*
    This route returns all the registered users. Only accessible to authenticated users.
    Hardcoded limit per page is 25.
    */
    let limit = 10;
    let page = req.params.page || 0;
    findAllUsers(limit, limit*page).then((userData) => {
        res.json({users: userData.inRange, hasMore: userData.hasMore});
    }).catch(next);
});

//
router.post('/delete/', authUser, (req, res, next) => {
    /*
    This route enables a user to delete a user account.
    */
    let id = req.body.id;
    let page = req.body.page;
    let limit = 10;
    deleteUser(id).then(() => {
        findAllUsers(limit, limit*page).then((userData) => {
            res.json({users: userData.inRange, hasMore: userData.hasMore});
        }).catch(next);
    }).catch(next);
});

const findAllUsers = async (limit, skip) => {
    let userLen = await User.countDocuments({});
    let usersInRange = await User.find({}).select('-password -confirm_token').limit(limit).skip(skip);
    return Object.assign({}, {inRange: usersInRange, hasMore: userLen > limit*skip});
}

const deleteUser = async (id) => {
    return await User.deleteOne({_id: id});
}


export default router;