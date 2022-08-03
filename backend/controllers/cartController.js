const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../models/cartModel');

exports.getCart = catchAsync(async (req, res, next) => {
  const doc = await Cart.find({ user: req.user.id }).populate(
    'products.product'
  );

  if (!doc) {
    return next(new AppError('Nothing Here. Lets Shop Together', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      cart: doc,
    },
  });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const { quantity, _id } = req.body;
  let doc;

  if (quantity <= 0) {
    doc = await Cart.updateOne(
      {
        user: req.user._id,
      },
      { $pull: { products: { product: _id } } }
    );
  } else {
    doc = await Cart.updateOne(
      {
        user: req.user._id,
        'products.product': req.body._id,
      },
      { $set: { 'products.$.quantity': req.body.quantity } }
    );
  }

  res.status(200).json({ doc });
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

exports.clearCart = catchAsync(async (req, res, next) => {
  const doc = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $set: { products: [] },
    }
  );

  res.status(200).json({
    status: 'success',
    data: { doc },
  });
});

exports.createCart = factory.createOne(Cart);
