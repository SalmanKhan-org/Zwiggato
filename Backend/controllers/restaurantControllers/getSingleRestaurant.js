const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Restaurant = require("../../models/restaurantModel");
const ErrorHandler = require("../../utils/ErrorHandler");

exports.getSingleRestaurant = catchAsyncErrors(
    async (req, res, next) => {
        const { id } = req.params;
        let restaurant = await Restaurant.findById(id).populate({ path: 'menus', options: { createdAt: -1 } });
        if (!restaurant) {
            return next(new ErrorHandler("Restaurant Not Found", 404));
    
        }
        res.status(200).json({
            success: true,
            restaurant
        })

    }
)