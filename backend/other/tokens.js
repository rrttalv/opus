import crypto from 'crypto';

export const genEmailToken = async () => {
    const bytes = crypto.randomBytes(25);
    return bytes.toString('hex');
};

export const genForgotToken = async () => {
    const bytes = crypto.randomBytes(30);
    return bytes.toString('hex');
};
