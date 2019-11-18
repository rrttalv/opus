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
        type: String
    },
    confirm_token: {
        type: String
    },
    login_count: {
        type: [{type: Date}]
    },
    signup: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', userSchema);

export const comparePassword = async (inputPassword, hash) => {
    return await bcrypt.compareSync(inputPassword, hash);
}

export const hashUserPassword = async (user) => {
    let salt = await bcrypt.genSaltSync(10);
    let hashedPassword = await bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
    return user;
}

export const hashPassword = async (textPassword) => {
    let salt = await bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(textPassword, salt);
}

export const saveNewUser = async (user) => {
    return await user.save();
}