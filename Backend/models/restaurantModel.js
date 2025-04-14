const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    restaurantName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    deliveryTime: {
        type: Number,
        required: true
    },
    cuisines: [
        {
            type: String,
            required: true
        }
    ],
    menus: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Menu"
        }
    ],
    image: {
        type: String,
        required: true
    }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;