const nodemailer = require("nodemailer");
exports.sendEmail = async (options) => {
    //create a transporer
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            }
        });
        //create mail options
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message
        }
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error("Failed to Send Email");
    }
}