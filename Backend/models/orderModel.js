const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        red: "User",
        required:true
    },
    restaurant: {
        type: mongoose.Schema.ObjectId,
        red: "Restaurant",
        required:true
    },
    deliveryDetails: {
        email: { type: String, required: true },
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true }
    },
    cartItems: [
        {
            menu: { type: mongoose.Schema.ObjectId, ref: "Menu" },
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "outfordelivery", "delivered"],
        required:true
    },
    totalPrice: {
        type: Number,
        required:true
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order