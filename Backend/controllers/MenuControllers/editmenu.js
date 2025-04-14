const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Menu = require("../../models/menuModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const { uploadImageOnCloudinary } = require("../../utils/imageUpload");

exports.editMenu = catchAsyncErrors(
    async (req, res, next) => {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;

        let menu = await Menu.findById(id);
        if (!menu) {
            return next(new ErrorHandler("Menu not found", 400));
        }

        if (name) menu.name = name;
        if (description) menu.description = description;
        if (price) menu.price = price;

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file);
            menu.image = imageUrl;
        }

        await menu.save();

        res.status(200).json({
            success: true,
            message: "Menu Updated",
            menu
        })

    }
)