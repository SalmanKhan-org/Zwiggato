const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const User = require("../../models/userModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const bcrypt = require("bcryptjs");
const { sendToken } = require("../../utils/sendToken");

exports.login = catchAsyncErrors(
    async (req, res, next) => {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid Email or Password", 400));
        }

        user.lastLogin = new Date()
        await user.save();

        sendToken(user, res, "User Logged in Successfully", 200);
    }
)