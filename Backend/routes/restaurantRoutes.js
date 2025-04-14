const express = require("express");
const { isAuthenticated } = require("../middlewares/authToken");
const { createRestaurant } = require("../controllers/restaurantControllers/createRestaurant");
const upload = require("../middlewares/multer");
const { getRestaurant } = require("../controllers/restaurantControllers/getRestaurant");
const { updateRestaurant } = require("../controllers/restaurantControllers/updateRestaurant");
const { getRestaurantOrders } = require("../controllers/restaurantControllers/getRestaurantOrders");
const { updateOrderStatus } = require("../controllers/orderControllers/updateOrderStatus");
const { searchResturant } = require("../controllers/restaurantControllers/searchRestaurant");
const { getSingleRestaurant } = require("../controllers/restaurantControllers/getSingleRestaurant");
const router = express.Router({ mergeParams: true });

router.route("/create").post(isAuthenticated, upload.single('image'), createRestaurant);
router.route("/restaurant").get(isAuthenticated, getRestaurant);
router.route("/update").put(isAuthenticated, upload.single("image"), updateRestaurant);
router.route("/orders").get(isAuthenticated, getRestaurantOrders);
router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatus);
router.route("/search/:searchText").get(isAuthenticated, searchResturant);
router.route("/restaurant/:id").get(isAuthenticated, getSingleRestaurant);

module.exports = router