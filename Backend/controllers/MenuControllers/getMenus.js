const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Menu = require("../../models/menuModel");

exports.getMenus = catchAsyncErrors(
    async (req, res, next) => {
        const menus = await Menu.find({});
        res.status(200).json({
            success: true,
            menus
        })
    }
)