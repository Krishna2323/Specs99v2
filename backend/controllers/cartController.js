const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../models/cartModel');

exports.getCart = catchAsync(async (req, res, next) => {
  const doc = await Cart.find({ user: req.user.id });

  if (!doc) {
    return next(new AppError('Nothing Here. Lets Shop Together', 404));
  }

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      products: doc,
    },
  });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const doc = await Cart.updateOne(
    {
      user: req.user._id,
      products: { $elemMatch: { _id: req.body._id } },
      // 'products._id': req.body._id,
    },
    { $set: { 'products.$.quantity': req.body.quantity } }
  );

  res.json({ doc });
});

exports.pushItem = catchAsync(async (req, res, next) => {
  const doc = await Cart.updateOne(
    { user: req.user._id },
    { $push: { products: req.body.product } }
  );

  res.json({
    doc,
  });
});

exports.setCartUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createCart = factory.createOne(Cart);
