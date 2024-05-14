const Apifilter = require('./../Utils/Apifitler');
const Product = require('./../Models/ProductModel');
exports.getAllProducts = async (req, res, next) => {
  try {
    // console.log(req.params);
    // let query = Product.find();
    // if (req.query.search) {
    //   const search = req.query.search
    //     ? {
    //         title: {
    //           $regex: req.query.search,
    //           $options: 'i',
    //         },
    //       }
    //     : {};

    //   query = query.find(search);
    // }
    // const queryObj = { ...req.query };
    // // 1.Filtering
    // // Create excuild field
    // const excuildField = ['page', 'sort', 'limit', 'category', 'search'];
    // excuildField.forEach(el => delete queryObj[el]);

    // //2. Advance filtering

    // let queryString = JSON.stringify(queryObj);

    // queryString = queryString.replace(
    //   /\b(gte|gt|lte|lt)\b/g,
    //   match => `$${match}`
    // );
    // query = query.find(JSON.parse(queryString));
    // // let query = Product.find(JSON.parse(queryString));
    // // 3. Sorting

    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // if (req.query.category) {
    //   const category = req.query.category;
    //   query = query.find({ category });
    // }

    // // 4. Pagination
    // //page=2&limit=10
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 10;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const tolDoc = await Product.countDocuments();
    //   if (skip >= tolDoc) {
    //     return res.status(400).json({
    //       status: 'This page is does not exists',
    //     });
    //   }
    // }
    const resultPerPage = 10;
    const apiFilter = new Apifilter(Product, req.query).search().filter();
    let products = await apiFilter.query;
    const totalRecords = products.length;
    apiFilter.pagination(resultPerPage);
    products = await apiFilter.query.clone();

    if (!products) {
      return res.status(200).json({
        status: 200,
        message: 'Successfull',
        products,
      });
    }
    res.status(200).json({
      status: 'Success',
      products,
      filterProductsCount: totalRecords,
      resultPerPage: resultPerPage,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Unsuccessfull',
      err: error,
      message: error.message,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({
        status: 'Unsuccessfull',
        message: 'Product does not exists',
      });
    }
    res.status(200).json({
      status: 'Success',
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Unsuccessfull',
      err: error,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(400).json({
        status: 'Unsuccessfull',
        err: error,
        message: 'Product does not exists',
      });
    }
    await product.save({ validateBeforeSave: true });

    res.status(200).json({
      status: 'Updated Successfully',
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Unsuccessfull',
      err: error,
      message: error.message,
    });
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(400).json({
        status: 'Unsuccessfull',
        err: error,
        message: 'Product not added please try again',
      });
    }

    res.status(200).json({
      status: 'Created Successfully',
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Unsuccessfull',
      err: error,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json({
        status: 'Unsuccessfull',
        err: error,
        message: 'Product does not exists',
      });
    }
    product.save();
    res.status(200).json({
      status: 'Deleted Successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Unsuccessfull',
      err: error,
      message: error.message,
    });
  }
};
