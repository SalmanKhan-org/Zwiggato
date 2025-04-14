const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const User = require("../../models/userModel");

const ErrorHandler = require("../../utils/ErrorHandler");
const { generateVerificationCode } = require("../../utils/genVerificationCode");
const { sendEmail } = require("../../utils/sendEmail");
const { sendToken } = require("../../utils/sendToken");

exports.signup = catchAsyncErrors(
    async (req, res, next) => {
        const { name, email, password, contact } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return next(new ErrorHandler("User Already Exist",400));
        }

    
        //generate verification token
        const verificationCode =  generateVerificationCode(6);
        let message = `Hi.. ${name}\n Here is the confirmation code you requested: ${verificationCode}\nIf you didn't reqeust this, you can ignore this or let us know\n\nThanks\nThe Zwiggato Team`;
        let subject = "Email Verification";

        try {
            await sendEmail({ email: email, subject, message });
            user = await User.create({
                name, email, password, contact: Number(contact), verificationToken:verificationCode, verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000
            });

            sendToken(user, res, "User Created ", 200)
        } catch (error) {
            res.status(401).json({
                error: true,
                message:"Email Confirmation Failed"
            })
        }
    }
)