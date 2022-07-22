const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadTourImages,
  resizeProductImages,
} = require('../controllers/productController');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(
    protect,
    restrictTo('admin'),
    uploadTourImages,
    resizeProductImages,
    createProduct
  );
router
  .route('/:id')
  .get(getProduct)
  .patch(protect, restrictTo('admin'), updateProduct)
  .delete(protect, restrictTo('admin'), deleteProduct);

module.exports = router;
