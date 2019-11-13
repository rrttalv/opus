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

const User = mongoose.model('User', userSchema);
export default User;

export const comparePassword = async (inputPassword, hash) => {
    return null
}

export const addUser = async (user) => {
    return null
}