const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user'],
  },
  shippingInfo: {
    address1: { type: String, required: [true, 'Please Specify Address 1'] },
    address2: { type: String, required: [true, 'Please Specify Address 2'] },
    contactNumber: {
      type: Number,
      required: [true, 'Please Specify Contact Number'],
    },
    pincode: { type: Number, required: [true, 'Please Specify Pincode'] },
    city: { type: String, required: [true, 'Please Specify City'] },
    state: { type: String, required: [true, 'Please Specify State'] },
    country: { type: String, required: [true, 'Please Specify Country'] },
  },
  products: [
    {
      product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
      price: { type: Number, required: [true, 'A Product Must Have Price.'] },
      quantity: {
        type: Number,
        required: [true, 'A Product Must Have Quantity.'],
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: [true, 'A Order Must Have A Total Price.'],
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
