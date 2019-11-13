import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const port = 4000 || process.env.PORT;
const app = express();

mongoose.connect('mongodb://admin:a55dm1n00@ds057847.mlab.com:57847/opus', { useNewUrlParser: true });
const auth = require('./routes/auth');
const api = require('./routes/api');

app.use(bodyParser.json());
app.use(cors());
app.use((err, req, res, next) => {
    res.json({status: false, message: "Something went wrong!"});
});

app.listen(port);