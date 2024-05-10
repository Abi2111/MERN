const express = require('express');
const {
  getAllProducts,
  getProduct,
  updateProduct,
  addProduct,
  deleteProduct,
} = require('../Controllers/ProductsController');
const productsRouter = express.Router();

productsRouter.route('/products').get(getAllProducts);
productsRouter
  .route('/product/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = productsRouter;
