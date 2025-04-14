const cloudinary = require("./cloudinary");

exports.uploadImageOnCloudinary = async (file) => {
    try {
        const base64Image = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${base64Image}`;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "uploads", // Optional: Organizes files in Cloudinary
        });

        return result.secure_url; // Return Cloudinary image URL
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
};
