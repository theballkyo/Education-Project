/**
 * Created by Jiravat on 18/2/2560.
 */
const nodemailer = require('nodemailer');
const logger = require('../common/logger');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('config');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: config.mail.SMTP_PORT,
    host: config.mail.SMTP_HOST,
    auth: {
        user: config.mail.SMTP_USERNAME,
        pass: config.mail.SMTP_PASSWORD,
    },
});

function* sendMessage(mailTo, html, text, subject) {
    const mailOptions = {
        from: config.mail.FROM_EMAIL, // sender address
        to: mailTo, // list of receivers
        subject, // Subject line
        text, // plaintext body
        html, // html body
    };

    // send mail with defined transport object
    yield transporter.sendMail(mailOptions).then((info) => {
        logger.info('Message sent: ' + info.response);
    });
}

module.exports = {
    sendMessage,
};
