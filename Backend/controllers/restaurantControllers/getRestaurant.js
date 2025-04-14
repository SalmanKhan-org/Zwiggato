const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Restaurant = require("../../models/restaurantModel");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.getRestaurant = catchAsyncErrors(
    async (req, res, next) => {
        const restaurant = await Restaurant.findOne({ user: req.user._id }).populate("menus");
        if (!restaurant) {
            return next(new ErrorHandler("Restaurant Not Found", 400));
        }
        res.status(200).json({
            success: true,
            restaurant
        })
    }
)