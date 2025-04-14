const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Order = require("../../models/orderModel");
const Restaurant = require("../../models/restaurantModel");

exports.getRestaurantOrders = catchAsyncErrors(
    async (req, res, next) => {
        let restaurant = await Restaurant.findOne({ user: req.user._id });
        if (!restaurant) {
            return next(new ErrorHandler("Restaurant Not Found", 404));
        }

        const orders = await Order.find({ restaurant: restaurant._id }).populate("restaurant").populate("user");

        res.status(200).json({
            success: true,
            orders
        })
    }
)