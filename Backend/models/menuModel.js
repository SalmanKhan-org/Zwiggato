const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    restaurantId: {
        type: mongoose.Schema.ObjectId,
        ref: "Restaurant"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;