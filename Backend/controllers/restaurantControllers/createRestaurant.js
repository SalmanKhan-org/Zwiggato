const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Restaurant = require("../../models/restaurantModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const multer = require("multer");
const { uploadImageOnCloudinary } = require("../../utils/imageUpload");

exports.createRestaurant = catchAsyncErrors(
    async (req, res, next) => {
        const { restaurantName, city, country,  deliveryTime, cuisines } = req.body;
        const restaurant = await Restaurant.findOne({ user: req.user._id });
        const image = req.file;
        if (restaurant) {
            return next(new ErrorHandler("Restaurant already exist for this user" , 400));
        }

        if (!image) {
            return next(new ErrorHandler("Image is required", 400));
        }

        const imageUrl = await uploadImageOnCloudinary(image);

        const payload = {
            user: req.user,
            restaurantName, city, country, deliveryTime, cuisines: JSON.parse(cuisines),image:imageUrl
        }

        await Restaurant.create( payload );

        res.status(200).json({
            success: true,
            message:"Restaurant Added"
        })
    }
)