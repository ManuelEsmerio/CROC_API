import {createTransport} from 'nodemailer';

// create reusable transporter object using the default SMTP transport
export const transporter = createTransport({
    port: process.env.EMAIL_PORT || 465,               // true for 465, false for other ports
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    secure: false, // true for 465, false for other ports
});

export const mailData = ({to, subject, text, html, attachments}) => {
    return {
        from: 'no-reply@gmail.com',  // sender address
        to,   // list of receivers
        subject,
        text,
        html,
        // An array of attachments object filename, path
        attachments
    }
};

export const mailDataResetPassword = ({to}) => {
    return {
        from: 'no-reply@gmail.com',  // sender address
        to,   // list of receivers
        subject,
        text,
        html,
        // An array of attachments object filename, path
        attachments
    }
};