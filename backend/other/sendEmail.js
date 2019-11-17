import * as postmark from 'postmark';
import ejs from 'ejs';
import fs from 'fs'
const verifyTemplate = fs.readFileSync('emails/verifyEmail.ejs', 'utf8'),
    forgotPasswordTemplate = fs.readFileSync('emails/forgotPasswordEmail.ejs', 'utf8');

const client = new postmark.ServerClient("2ea0be04-9676-41ca-9699-fd834598a159");

//client.sendEmail()

export const renderVerifyEmail = async (verifyToken, verifyLink) => {
    return await ejs.render(verifyTemplate, {token: verifyToken, link: verifyLink});
}

export const sendVerifyEmail = async (emailTemplate, sendTo) => {
    client.sendEmail({
        From: "ricotalvar@pohi.io",
        To: sendTo,
        Subject: "Verify email",
        HtmlBody: emailTemplate
    })
}