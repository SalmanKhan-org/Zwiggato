const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const User = require("../../models/userModel");
const cloudinary  = require("../../utils/cloudinary");
const { uploadImageOnCloudinary } = require("../../utils/imageUpload");

exports.updateProfile = catchAsyncErrors(
    async (req, res, next) => {
        let id = req?.user._id;
        const { name, email, address, city, country } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: "No profile image provided" });
        }

        const imageUrl = await uploadImageOnCloudinary(file);
        const payload = {
            name, email, address, city, country, profilePicture:imageUrl
        }

        const user = await User.findByIdAndUpdate(id, payload, { new: true, useFindAndModify: false });
        
        res.status(200).json({
            success: true,
            message: "Profile updated Successfully",
            user
        })
    }
)