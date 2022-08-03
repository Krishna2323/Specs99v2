const { Router } = require('express');
const { protect } = require('../controllers/authController');
// const Product = require('../models/productModel');
const {
  getCart,
  createCart,
  setCartUserId,
  pushItem,
  updateCartItem,
  clearCart,
} = require('../controllers/cartController');

const router = Router();

router.use(protect);

router.route('/').get(getCart).post(setCartUserId, createCart);
router.route('/updateCart').put(pushItem);
router.route('/updateCartItem').put(updateCartItem);
router.route('/clearCart').delete(clearCart);

module.exports = router;
