const { catchAsyncErrors } = require("../../middlewares/catchAsyncErrors");
const Order = require("../../models/orderModel");
const Restaurant = require("../../models/restaurantModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const { createLineItems } = require("./createLineItems");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = catchAsyncErrors(
    async (req, res, next) => {
        const checkoutSessionRequest = req.body;
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurant).populate("menus");
        if (!restaurant) {
            return next(new ErrorHandler("Restaurant Not Found", 400));
        }

        const order = new Order({
            restaurant: restaurant._id,
            user: req.user._id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            totalPrice:checkoutSessionRequest.totalPrice,
            status: "pending"
        });
        //line items
        const menuItems = restaurant.menus;
        const lineitems = createLineItems(checkoutSessionRequest, menuItems,next);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['GB', 'US', 'CA']
            },
            line_items: lineitems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/order/status`,
            cancel_url: `${process.env.FRONTEND_URL}/viewcart`,
            metadata: {
                orderId: order._id.toString(),
                images: JSON.stringify(menuItems.map((item) => item.image))
            }
        });
        if (!session.url) {
            return next(new ErrorHandler("Error while creating sessions", 400));
        }
        await order.save();
        res.status(200).json({
            success: true,
            session
        })
    }
)