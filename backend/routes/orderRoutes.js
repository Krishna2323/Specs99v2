const express = require('express');

const { protect, restrictTo } = require('../controllers/authController');
const {
  createUnpaidOrder,
  getAllOrder,
  getUserOrders,
  getCheckoutSession,
} = require('../controllers/orderController');

const router = express.Router();

const setDefaults = (req, res, next) => {
  req.body.user = req.user._id;
  req.body.paymentMethod = 'cod';
  req.body.paymentStatus = 'unpaid';
  next();
};

router.route('/').get(protect, getUserOrders);
router.post('/codOrder', protect, setDefaults, createUnpaidOrder);
router.post('/check-out-session', protect, getCheckoutSession);

router.route('/admin').get(protect, restrictTo('admin'), getAllOrder);

module.exports = router;
