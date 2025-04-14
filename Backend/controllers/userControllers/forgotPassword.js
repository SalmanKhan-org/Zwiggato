const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const User = require("../../models/userModel");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.forgotPassword = catchAsyncErrors(
    async (req, res, next) => {
        const { email } = req.body;
        let user = await User.fintOne({ email });
        if (!user) {
            return next(new ErrorHandler("User doesn't Exist", 400));
        }

        //generate reset password token
        const token = user.getResetPasswordToken();
        await user.save();

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${token}`;
        const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Zwiggato Password Recovery",
                message
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordTokenExpireAt = undefined;
            await user.save();
        }
    }
)