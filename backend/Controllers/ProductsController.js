const Product = require('./../Models/ProductModel');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 'Success',
      products,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Unsuccessfull',
      err: error,
      message: error.message,
    });
  }
};
