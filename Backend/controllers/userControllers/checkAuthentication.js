const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.checkAuthentication = catchAsyncErrors(
    async (req, res, next) => {
        let user = req?.user;

        if (!user) {
            return next(new ErrorHandler("User is not logged in", 400));
        }

        res.status(200).json({
            success: true,
            message: "User is Authenticated",
            user
        })

    }
)