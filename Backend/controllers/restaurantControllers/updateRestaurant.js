const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Restaurant = require("../../models/restaurantModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const { uploadImageOnCloudinary } = require("../../utils/imageUpload");

exports.updateRestaurant = catchAsyncErrors(
    async (req, res, next) => {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.user._id });
        if (!restaurant) {
            return next(new ErrorHandler("Restaurant not found", 404));
        };
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines);

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant.save();
        return res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant
        })
    }
)