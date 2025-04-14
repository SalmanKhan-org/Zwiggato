const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncErrors(
    async (req, res, next) => {
        const { token } = req.cookies;

        if (!token) {
            return next(new ErrorHandler("Please Login ", 401));
        }

        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodeData.id);

        next();
    }
)