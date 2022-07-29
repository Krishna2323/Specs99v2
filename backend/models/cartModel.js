const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Cart must belong to a user'],
  },
  products: {
    type: Array,
    required: [true, 'Products must be specified.'],
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
