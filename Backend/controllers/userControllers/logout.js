const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");

exports.logout = catchAsyncErrors(
    async (req, res, next) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });

        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    }
)