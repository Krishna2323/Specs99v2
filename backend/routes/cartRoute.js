const { Router } = require('express');
const { protect } = require('../controllers/authController');
// const Product = require('../models/productModel');
const {
  getCart,
  createCart,
  setCartUserId,
  pushItem,
  updateCartItem,
} = require('../controllers/cartController');

const router = Router();

router.use(protect);

router.route('/').get(getCart).post(setCartUserId, createCart);
router.route('/updateCart').post(pushItem);
router.route('/updateCartItem').post(updateCartItem);

module.exports = router;
