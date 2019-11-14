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

export default mongoose.model('User', userSchema);

export const comparePassword = async (inputPassword, hash) => {
    return null
}

export const hashUserPassword = async (user) => {
    let salt = await bcrypt.genSaltSync(10);
    let hashedPassword = await bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
    return user;
}

export const saveNewUser = async (user) => {
    return await user.save();
}