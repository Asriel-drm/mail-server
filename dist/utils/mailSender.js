import 'dotenv/config';
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
export default async function sendMail({ name, email, message }) {
    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_TO,
        subject: `Portfolio: contact de ${name}`,
        replyTo: email,
        text: (`Message de ${name} <${email}> \n\n ${message}`),
    });
}
