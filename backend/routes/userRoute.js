const express = require('express');
const {
  login,
  signup,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
  loadUser,
} = require('../controllers/authController');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  deleteMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controllers/userControler');

const router = express.Router();

// LOGIN / SINGUP / LOGOUT
router.route('/login').post(login);
router.route('/loadUser').get(loadUser);
router.route('/singup').post(signup);
router.route('/logout').get(logout);

// FORGOT PASSWORD / RESET PASSWORD
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

//PROTECTED ROUTES (ONLY USERS WITH JWT TOKEN)
router.use(protect);

router.route('/updateMyPassword').post(updatePassword);
router.get('/me', getMe, getUser);
router.post('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

// ONLY ACCESSABLE FOR ADMIN
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
