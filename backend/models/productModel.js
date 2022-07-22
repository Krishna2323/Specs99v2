const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'A Product Must Have A Brand Name.'],
    trim: true,
  },
  model: {
    type: String,
    required: [true, 'A Product Must Have A Model Name'],
    trim: true,
  },
  mrp: {
    type: Number,
    required: [true, 'A Product Must Have MRP.'],
  },
  price: {
    type: Number,
    required: [true, 'A Product Must Have A Price.'],
  },
  size: {
    type: String,
    required: [true, 'A Product Must Have A Size.'],
  },
  modelType: {
    type: String,
    required: [true, 'A Product Must Have A Model Type'],
  },
  lenseType: {
    type: String,
    required: [true, 'A Product Must Have A Lense Type.'],
  },
  lenseColor: {
    type: String,
    required: [true, 'A Product Must Have A Lens Color.'],
  },
  frameType: {
    type: String,
    required: [true, 'Please Specify The Frame Type.'],
  },
  frameColor: {
    type: String,
    required: [true, 'A Product Must Have A Frame Color.'],
  },

  gender: {
    type: String,
    required: [true, 'Please Specify Gender.'],
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, 'Please Specify Description.'],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A Tour Must Have A Cover Image.'],
    trim: true,
  },
  images: {
    type: Array,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
