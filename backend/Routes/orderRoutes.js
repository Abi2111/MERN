const express = require('express');
const {
  newOrder,
  getOrderDetails,
  getUserOrders,
  getAllOrders,
  updateOrder,
  updateOrderStatus,
} = require('../Controllers/OrderController');
const orderRouter = express.Router();
const {
  authenticated,
  adminAuthorized,
} = require('./../Middlewares/authorized');
orderRouter.route('/new/order').post(authenticated, newOrder);
orderRouter.route('/user/orders').get(authenticated, getUserOrders);
orderRouter.route('/orders/:id').get(getOrderDetails);
orderRouter
  .route('/admin/orders')
  .get(authenticated, adminAuthorized('admin'), getAllOrders);

orderRouter
  .route('/admin/orders/update/:id')
  .put(authenticated, adminAuthorized('admin'), updateOrderStatus);

module.exports = orderRouter;
