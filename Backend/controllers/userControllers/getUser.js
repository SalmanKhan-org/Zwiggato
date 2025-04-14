const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.getUser = catchAsyncErrors(
    async (req, res, next) => {
        const user = req?.user;
        if (!user) {
            return next(new ErrorHandler("user Not Found", 404));
        }

        res.status(200).json({
            success: true,
            user
        })
    }
)