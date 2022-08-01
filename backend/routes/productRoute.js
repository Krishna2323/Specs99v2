const express = require('express');
const multer = require('multer');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadTourImages,
  upload,
  resizeProductImages,
} = require('../controllers/productController');

const multerMid = multer();

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(
    protect,
    restrictTo('admin'),
    upload.fields([
      { name: 'imageCover', maxCount: 1 },
      { name: 'images', maxCount: 3 },
    ]),
    resizeProductImages,
    createProduct
  );
router
  .route('/:id')
  .get(getProduct)
  .patch(
    protect,
    restrictTo('admin'),
    upload.fields([
      { name: 'imageCover', maxCount: 1 },
      { name: 'images', maxCount: 3 },
    ]),
    resizeProductImages,
    updateProduct
  )
  .delete(protect, restrictTo('admin'), deleteProduct);

module.exports = router;
