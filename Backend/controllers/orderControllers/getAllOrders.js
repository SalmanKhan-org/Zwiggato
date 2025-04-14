const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Order = require("../../models/orderModel");

exports.getAllOrders = catchAsyncErrors(
    async (req, res, next) => {
        const orders = await Order.find({ user: req.user._id }).populate("user").populate("restaurant");


        res.status(200).json({
            success: true,
            orders
        })
    }
)