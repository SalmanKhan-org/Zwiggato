const express = require("express");
const { isAuthenticated } = require("../middlewares/authToken");
const upload = require("../middlewares/multer");
const { addMenu } = require("../controllers/MenuControllers/addMenu");
const { editMenu } = require("../controllers/MenuControllers/editmenu");
const router = express.Router({ mergeParams: true });

router.route("/add/menu").post(isAuthenticated, upload.single("image"), addMenu);
router.route("/menu/:id").put(isAuthenticated, upload.single('image'), editMenu);

module.exports = router;