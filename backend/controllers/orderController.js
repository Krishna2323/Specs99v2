const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

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
  const { products, address } = req.body;

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
    success_url: `${req.protocol}://${req.get('host')}/user/orders`,
    cancel_url: `${req.protocol}://${req.get('host')}/user/orders`,
    customer_email: req.user.email,
    client_reference_id: req.user._id,
    line_items: productInfo,
    metadata: {
      address: address.address,
      street: address.street,
      contact: address.contact,
      altContact: address.altContact,
      email: address.email,
      firstName: address.firstName,
      lastName: address.lastName,
      state: address.state,
      city: address.city,
      postalCode: address.poastalCode,
      country: address.country,
    },
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

createBookingCheckout = async (data) => {
  console.log('DATA', data);
  const getResponse = async (response) => {
    try {
      const products = response.data.map((el) => {
        return {
          quantity: el.quantity,
          price: el.amount_total / 100,
          product: el.description,
        };
      });

      const user = await User.findOne({ email: data.customer_email })._id;

      await Order.create({
        products,
        shippingInfo: { ...data.object.metadata },
        user,
        totalPrice: data.object.amount_total / 100,
        paymentMethod: 'online',
        paymentStatus: 'paid',
      });
    } catch (error) {
      console.log(error);
    }
  };
  await stripe.checkout.sessions.listLineItems(
    data.object.id,
    { limit: 5 },
    function (error, response) {
      if (error) {
        return res.status(400).send(`Error : ${error.message}`);
      }
      getResponse(response);
    }
  );
};

exports.webhookCheckout = async (req, res, next) => {
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
    await createBookingCheckout(event.data);
    res.status(200).json({ received: event });
  }
};

exports.createUnpaidOrder = factory.createOne(Order);
exports.getAllOrder = factory.getAll(Order);
