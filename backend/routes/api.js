import User from '../models/user';
import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({message: 'Hello'})
})


export default router;