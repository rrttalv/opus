import crypto from 'crypto';
import config from 'config';

const key = config.get('randomSecret');
const algo = 'aes256';

export const genEmailToken = async () => {
    let bytes = crypto.randomBytes(25);
    return bytes.toString('hex');
}

export const genForgotToken = async () => {
    let bytes = crypto.randomBytes(30);
    return bytes.toString('hex');
}