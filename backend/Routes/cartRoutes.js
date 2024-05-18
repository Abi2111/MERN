const express = require('express');
const {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
} = require('../Controllers/CartController');
const cartRouter = express.Router();
const { authenticated } = require('./../Middlewares/authorized');
cartRouter.route('/addcart').post(authenticated, addToCart);
cartRouter.route('/getCart').get(authenticated, getCart);
cartRouter.route('/updatecart').put(authenticated, updateCart);
cartRouter.route('/deletecart').delete(authenticated, deleteCart);

module.exports = cartRouter;
