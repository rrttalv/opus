import crypto from 'crypto';

const key = 'fGFPA4BT1Wg';
const algo = 'aes256';

export const genEmailToken = async () => {
    let bytes = crypto.randomBytes(25);
    return bytes.toString('hex');
}

export const genForgotToken = async () => {
    let bytes = crypto.randomBytes(30);
    return bytes.toString('hex');
}