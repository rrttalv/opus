import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import ejs from 'ejs';
import authRouter from './routes/auth';
import userRouter from './routes/users';

const port = 4000 || process.env.PORT;
const app = express();

mongoose.connect('mongodb://admin:a55dm1n00@ds057847.mlab.com:57847/opus', { useNewUrlParser: true, useFindAndModify: false });
app.set('emails', path.join(__dirname, 'emails'));
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', ejs);

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
    console.log(err);
});

app.listen(port, () => console.log(`server started on port ${port}`));
