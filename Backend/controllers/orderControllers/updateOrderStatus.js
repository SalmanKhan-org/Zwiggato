const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Order = require("../../models/orderModel");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.updateOrderStatus = catchAsyncErrors(
    async (req, res, next) => {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return next(new ErrorHandler("Order not Found", 404));
        }

        order.status = status;

        await order.save();
        res.status(200).json({
            success: true,
            status:order.status,
            message:"Status Updated"
        })
    }
)