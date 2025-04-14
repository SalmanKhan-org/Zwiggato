const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const User = require("../../models/userModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const { sendEmail } = require("../../utils/sendEmail");

exports.resetPassword = catchAsyncErrors(
    async (req, res, next) => {
        const { token } = req.params;
        const { newPassword } = req.body;

        let user = await User.findOne({ resetPasswordToken: token, resetPasswordTokenExpireAt: { $gt: Date.now() } }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid or Expire reset Token"));
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpireAt = undefined;
        await user.save();

        message = "Your password has been updated successfully"

        await sendEmail({
            email: user.email,
            subject: "Zwiggato Password recovery",
            message
        })
    }
)