const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user'],
  },

  shippingInfo: {
    firstName: {
      type: String,

      required: [true, 'Please Specify Firstname Of Customer'],
    },
    lastName: {
      type: String,

      required: [true, 'Please Specify lastName Of Customer'],
    },
    email: {
      type: String,
      required: [true, 'Order Must Contain User Email.'],
    },
    address: { type: String, required: [true, 'Please Specify Address 1'] },
    street: { type: String, required: [true, 'Please Specify Address 2'] },
    contactNumber: {
      type: Number,
      required: [true, 'Please Specify Contact Number'],
    },
    altContactNumber: {
      type: Number,
      required: [true, 'Please Specify Alternative Contact Number'],
    },
    city: { type: String, required: [true, 'Please Specify City'] },
    state: { type: String, required: [true, 'Please Specify State'] },
    country: { type: String, required: [true, 'Please Specify Country'] },
    postalCode: { type: Number, required: [true, 'Please Specify Pincode'] },
  },
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Must Have Atleast One Product.'],
      },
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
  paymentMethod: {
    type: String,
    required: [true, 'Order Must Have A Payment Method.'],
    enum: {
      values: ['cod', 'online'],
      message: 'Payment Method Is Either: Online Or COD.',
    },
  },
  paymentStatus: {
    type: String,
    required: [true, 'Order Must Have Payment Status.'],
    enum: {
      values: ['paid', 'unpaid'],
      message: 'Payment Status Is Either: Paid Or Unpaid.',
    },
  },
  deliveryStatus: {
    type: String,
    default: 'processing',
    enum: {
      values: ['processing', 'packed', 'shipped', 'delivered'],
      message:
        'Delivery Status Is Either: processing,packed, shipped,Or delivered.',
    },
  },
  orderedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
