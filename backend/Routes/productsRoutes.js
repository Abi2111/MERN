const express = require('express');
const { getAllProducts } = require('../Controllers/ProductsController');
const productsRouter = express.Router();

productsRouter.route('/products').get(getAllProducts);

module.exports = productsRouter;
