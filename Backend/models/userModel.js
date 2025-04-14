const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        select:false,
        required:true
    },
    contact: {
        type: Number,
        required:true
    },
    address: {
        type: String,
        default: "Update your address"
    },
    city: {
        type: String,
        default: "Update your city"
    },
    country: {
        type: String,
        default: "Update your country"
    },
    profilePicture: {
        type: String,
        default:""
    },
    admin: {
        type: Boolean,
        default:false
    },
    //advance authentication
    lastLogin: {
        type: Date,
        default:Date.now()
    },
    isVerified: {
        type: Boolean,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordTokenExpireAt: Date,
    verificationToken: String,
    verificationTokenExpireAt:Date
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.getJWTToken =  function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "7h"
    });
}

//get Reset Password Token
userSchema.getResetPasswordToken = function () {
    const token = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    this.resetPasswordTokenExpireAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    return token;
}

const User = mongoose.model("User", userSchema)
module.exports = User