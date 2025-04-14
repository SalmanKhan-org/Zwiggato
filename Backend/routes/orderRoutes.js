const express = require("express");
const { isAuthenticated } = require("../middlewares/authToken");
const upload = require("../middlewares/multer");
const { getAllOrders } = require("../controllers/orderControllers/getAllOrders");
const { createCheckoutSession } = require("../controllers/orderControllers/createCheckoutSession");
const { stripeWebhook } = require("../controllers/orderControllers/createLineItems");
const router = express.Router({ mergeParams: true });

router.route("/all-orders").get(isAuthenticated, getAllOrders);
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;