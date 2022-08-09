const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const { uploadFileAWS, getFileStream } = require('./s3');

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

// exports.resizeProductImages = catchAsync(async (req, res, next) => {
//   console.log(req.files);

//   if (!req.files?.imageCover || !req.files?.images) {
//     return next();
//   }

//   // 1) Cover image
//   req.body.imageCover = `product-${req.body.brand
//     .split(' ')
//     .join('-')}-${req.body.model
//     .split(' ')
//     .join('-')}-${Date.now()}-cover.jpeg`;
//   await sharp(req.files.imageCover[0].buffer)
//     .resize(2000, 1333)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(
//       `./frontend/src/components/assests/products/${req.body.imageCover}`
//     );

//   // 2) Images
//   req.body.images = [];

//   await Promise.all(
//     req.files.images.map(async (file, i) => {
//       const filename = `product-${req.body.brand
//         .split(' ')
//         .join('-')}-${req.body.model.split(' ').join('-')}-${Date.now()}-${
//         i + 1
//       }.jpeg`;

//       await sharp(file.buffer)
//         .resize(2000, 1333)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`./frontend/src/components/assests/products/${filename}`);

//       req.body.images.push(filename);
//     })
//   );

//   next();
// });

// exports.uploadAWS = multer({ dest: 'uploads' });

// exports.testFunc = catchAsync(async (req, res, next) => {
//   if (!req.files?.imageCover || !req.files?.images) {
//     return next();
//   }

//   const result = await uploadFileAWS(req.files.imageCover[0]);
//   console.log(result);
//   req.body.imageCover = `api/v1/images/${result.Key}`;

//   req.body.images = [];

//   req.files.images.map(async (el) => {
//     const result = await uploadFileAWS(el);
//     req.body.images.push(`api/v1/images/${result.Key}`);
//   });

//   next();
// });

exports.testFuncResize = catchAsync(async (req, res, next) => {
  if (!req.files?.imageCover || !req.files?.images) {
    return next();
  }
  imageCoverFilename = `product-${req.body.brand
    .split(' ')
    .join('-')}-${req.body.model
    .split(' ')
    .join('-')}-${Date.now()}-cover.jpeg`;

  const rest = await sharp(req.files.imageCover[0].buffer)
    .resize(2300, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    .toFile(`./uploads/${imageCoverFilename}`);

  const result = await uploadFileAWS(
    `./uploads/${imageCoverFilename}`,
    imageCoverFilename
  );

  req.body.imageCover = `/api/v1/images/${result.Key}`;

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
        .jpeg({ quality: 100 })
        .toFile(`./uploads/${filename}`);

      const result = await uploadFileAWS(`./uploads/${filename}`, filename);

      req.body.images.push(`/api/v1/images/${result.Key}`);
      console.log(req.body);
    })
  );

  next();
});

exports.getImages = (req, res) => {
  console.log('REd');
  const { key } = req.params;
  const readStream = getFileStream(key);

  readStream.pipe(res);
};

exports.getProducts = getAll(Product);
exports.getProduct = getOne(Product);
exports.createProduct = createOne(Product);
exports.updateProduct = updateOne(Product);
exports.deleteProduct = deleteOne(Product);
