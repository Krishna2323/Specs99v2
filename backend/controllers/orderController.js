const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Order = require('../models/orderModel');

exports.getUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('products.product')
    .sort({ orderedAt: -1 });

  res.status(200).json({
    status: 'success',
    data: {
      orders,
    },
  });
});

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { products } = req.body;

  const productInfo = products.map((el) => {
    return {
      name: `${el.product.brand} ${el.product.model}`,
      amount: el.product.price * 100,
      currency: 'inr',
      quantity: el.quantity,
      description: el.product._id,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/`,
    customer_email: req.user.email,
    client_reference_id: req.user._id,
    line_items: productInfo,
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

const createBookingCheckout = (session) => {
  console.log(session.line_items);
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    createBookingCheckout(event.data.object);
    res.status(200).json({ received: event.data.object.line_items });
  }
};

exports.createUnpaidOrder = factory.createOne(Order);
exports.getAllOrder = factory.getAll(Order);
