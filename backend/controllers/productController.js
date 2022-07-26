const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
// const ApiFeature = require('../utils/apiFeatures');
// const catchAsync = require('../utils/catchAsync');

const {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// exports.uploadTourImages = upload.fields([
//   { name: 'imageCover', maxCount: 1 },
//   { name: 'images', maxCount: 5 },
// ]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  console.log('Controller', req.files);
  // console.log(req.files);

  if (!req.files.imageCover || !req.files.images) {
    console.log(false);
    req.body.imageCover = 'testMulter';
    return next();
  }

  // 1) Cover image
  req.body.imageCover = `product-${req.body.brand
    .split(' ')
    .join('-')}-${req.body.model
    .split(' ')
    .join('-')}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`../frontend/src/public/img/products/${req.body.imageCover}`);

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${req.body.brand
        .split(' ')
        .join('-')}-${req.body.model.split(' ').join('-')}-${Date.now()}-${
        i + 1
      }.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`../frontend/src/public/img/products/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.getProducts = getAll(Product);
exports.getProduct = getOne(Product);
exports.createProduct = createOne(Product);
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);
