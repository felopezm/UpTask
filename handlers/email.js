const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }

});

const generatorHtml = (file, options) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${file}.pug`, options);
    return juice(html);
}

exports.sendMail = async (options) =>{
    const html = generatorHtml(options.file, options);
    const text = htmlToText.fromString(html);
    let mailOptions = {
        from: 'UpTask <no-reply@uptask.com>',
        to: options.user.email,
        subject: options.subject,
        text,
        html
    };
    
   await transport.sendMail(mailOptions);
}