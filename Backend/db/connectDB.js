const mongoose = require("mongoose");

exports.connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("Connected to DB Successfully")
        })
    } catch (error) {
        console.log(error)
    }
}