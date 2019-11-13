import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    forgot_token: {
        time: {
            type: Date
        },
        token: {
            type: String
        }
    },
    confirm_token: {
        time: {
            type: Date
        },
        token: {
            type: String
        }
    },
    login_count: {
        type: Number
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.comparePassword = async (inputPassword, hash) => {
    return null
}

module.exports.addUser = async (user) => {
    return null
}