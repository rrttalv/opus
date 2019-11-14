import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
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
    },
    signup: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
export default User;

export const comparePassword = async (inputPassword, hash) => {
    return null
}

export const addUser = async (user) => {
    return null
}