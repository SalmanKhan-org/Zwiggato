const express = require("express");
const { signup } = require("../controllers/userControllers/signup");
const { login } = require("../controllers/userControllers/login");
const { logout } = require("../controllers/userControllers/logout");
const { verifyEmail } = require("../controllers/userControllers/verifyEmail");
const { forgotPassword } = require("../controllers/userControllers/forgotPassword");
const { resetPassword } = require("../controllers/userControllers/resetPassword");
const { isAuthenticated } = require("../middlewares/authToken");
const { updateProfile } = require("../controllers/userControllers/updateProfile");
const { checkAuthentication } = require("../controllers/userControllers/checkAuthentication");
const { getUser } = require("../controllers/userControllers/getUser");
const upload = require("../middlewares/multer");
const router = express.Router({ mergeParams: true });


//register user
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/get-user").get( isAuthenticated, getUser);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword)
router.route("/profile/update").put(isAuthenticated, upload.single("profilePicture"), updateProfile);

module.exports = router;