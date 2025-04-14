const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Menu = require("../../models/menuModel");
const Restaurant = require("../../models/restaurantModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const { uploadImageOnCloudinary } = require("../../utils/imageUpload");

exports.addMenu = catchAsyncErrors(
    async (req, res, next) => {
        const { name, description, price } = req.body;
        const file = req.file;

        if (!file) {
            return next(new ErrorHandler("Image is required", 404));
        }

        const imageUrl = await uploadImageOnCloudinary(file);
        const menu = await Menu.create({ name, description, price, image: imageUrl });

        const restaurant = await Restaurant.findOne({ user: req.user._id });
        if(!restaurant) {
            return next(new ErrorHandler("Restaurant Not Found", 400));
        }

        restaurant.menus.push(menu);

        await restaurant.save();

        res.status(200).json({
            success: true,
            message: "Menu Added",
            menu
        })
    }
)