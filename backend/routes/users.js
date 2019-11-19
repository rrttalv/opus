import express from 'express';
import { authUser } from '../other/middleware';
import User from '../models/user';
import { renderDeletedAccountEmail, sendDeletedEmail } from '../other/sendEmail';

/*
    All routes requiring authentication live in this file.
*/

const findAllUsers = async (limit, page, skip) => {
    /*
        Finds all users in a certain range.
    */
    const userLen = await User.countDocuments({});
    const usersInRange = await User.find({}).select('-password -confirm_token').limit(limit).skip(skip);
    return { inRange: usersInRange, hasMore: userLen > (limit * page) + limit };
};

const deleteUser = async (id) => {
    /*
        Finds user with ID, deletes and returns them.
    */
    return await User.findOneAndDelete({ _id: id });
};

const router = express.Router();

router.get('/:page', authUser, (req, res, next) => {
    /*
    This route returns all the registered users. Only accessible to authenticated users.
    Hardcoded limit per page is 10.
    */
    const limit = 10;
    const page = req.params.page || 0;
    findAllUsers(limit, page, limit * page).then((userData) => {
        res.json({ users: userData.inRange, hasMore: userData.hasMore, page });
    }).catch(next);
});

//
router.delete('/delete/:id/:page', authUser, (req, res, next) => {
    /*
    This route enables a user to delete a user account.
    */
    const { id } = req.params;
    const { page } = req.params;
    const limit = 10;
    const adminAccount = req.user.email;
    // If user is trying to delete themselves just send back all the accounts and do nothing
    if (req.user._id !== id) {
        deleteUser(id).then((deletedUser) => {
            renderDeletedAccountEmail(adminAccount).then((template) => {
                // Would enter "deletedUser.email" if the email API would be in live use
                sendDeletedEmail(template, 'ricotalvar@pohi.io').then(() => {
                    findAllUsers(limit, page, limit * page).then((userData) => {
                        res.json({ users: userData.inRange, hasMore: userData.hasMore, page });
                    }).catch(next);
                }).catch(next);
            }).catch(next);
        }).catch(next);
    }
    else {
        findAllUsers(limit, page, limit * page).then((userData) => {
            res.json({ users: userData.inRange, hasMore: userData.hasMore, page });
        }).catch(next);
    }
});


export default router;
