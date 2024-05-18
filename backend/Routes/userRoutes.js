const express = require('express');
const {
  userRegister,
  userLogin,
  userLogout,
  forgotPassword,
  resetpassword,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  adminDelete,
  adminUpdateProfile,
  userProfile,
  uploadAvatar,
} = require('../Controllers/UserController');
const {
  authenticated,
  adminAuthorized,
} = require('./../Middlewares/authorized');
const UserRouter = express.Router();
UserRouter.route('/login').post(userLogin);
UserRouter.route('/signin').post(userRegister);
UserRouter.route('/logout').get(userLogout);
UserRouter.route('/profile').get(authenticated, userProfile);
UserRouter.route('/update_password').put(authenticated, updatePassword);
UserRouter.route('/reset_password/:token').put(resetpassword);
UserRouter.route('/forgot_password').post(forgotPassword);
UserRouter.route('/update_profile').put(authenticated, updateProfile);
UserRouter.route('/allUser').get(
  authenticated,
  adminAuthorized('admin'),
  getAllUsers
);
UserRouter.route('/user/:id').get(getUserDetails);
UserRouter.route('/admin/delete_user/:id').delete(
  authenticated,
  adminAuthorized('admin'),
  adminDelete
);
UserRouter.route('/admin/update_profile/:id').get(
  authenticated,
  adminAuthorized('admin'),
  adminUpdateProfile
);
UserRouter.route('/upload_avatar').post(authenticated, uploadAvatar);
module.exports = UserRouter;
