import * as postmark from 'postmark';
import ejs from 'ejs';
import fs from 'fs';
import config from 'config';
const verifyTemplate = fs.readFileSync('emails/verifyEmail.ejs', 'utf8'),
    forgotPasswordTemplate = fs.readFileSync('emails/forgotPasswordEmail.ejs', 'utf8'),
    deletedAccountTemplate = fs.readFileSync('emails/accountDeletedEmail.ejs', 'utf8');

const client = new postmark.ServerClient(config.get('emailApi'));

export const renderVerifyEmail = async (verifyToken, verifyLink) => {
    return await ejs.render(verifyTemplate, {token: verifyToken, link: verifyLink});
}

export const sendVerifyEmail = async (template, sendTo) => {
    client.sendEmail({
        From: "ricotalvar@pohi.io",
        To: sendTo,
        Subject: "Verify Your Email",
        HtmlBody: template
    })
}

export const renderForgotEmail = async (forgotLink) => {
    return await ejs.render(forgotPasswordTemplate, {link: forgotLink});
}

export const sendForgotEmail = async (template, sendTo) => {
    client.sendEmail({
        From: "ricotalvar@pohi.io",
        To: sendTo,
        Subject: "Forgot Password",
        HtmlBody: template
    })
}

export const renderDeletedAccountEmail = async (adminEmail) => {
    return await ejs.render(deletedAccountTemplate, {adminEmail: adminEmail})
}

export const sendDeletedEmail = async (template, sendTo) => {
    client.sendEmail({
        From: "ricotalvar@pohi.io",
        To: sendTo,
        Subject: "Your Account Has Been Deleted",
        HtmlBody: template
    })
}