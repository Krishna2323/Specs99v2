const express = require('express');

const { protect, restrictTo } = require('../controllers/authController');
const { createSession } = require('../controllers/bookingController');

const router = express.Router();

router.route('/check-out-session').get(protect, createSession);

module.exports = router;
