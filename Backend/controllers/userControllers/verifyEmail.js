const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const User = require("../../models/userModel");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.verifyEmail = catchAsyncErrors(
    async (req, res, next) => {
        const { verificationCode } = req.body;

        let user = await User.findOne({ verificationToken: verificationCode, verificationTokenExpireAt: { $gt: Date.now() } });

        if (!user) {
            return next(new ErrorHandler("Invalid or expired verification token"));
        }

        user.isVerified = true;
        user.verificationToken = undefined
        user.verificationTokenExpireAt = undefined;
        await user.save();

        //send Welcome Email
        res.status(200).json({
            success: true,
            message: "Email Verified Successfully"
        });
    }
)