const Product = require('./../Models/ProductModel');

exports.getAllProducts = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };
    // 1.Filtering
    // Create excuild field
    const excuildField = ['page', 'sort', 'limit', 'field'];
    excuildField.forEach(el => delete queryObj[el]);

    //2. Advance filtering

    let queryString = JSON.stringify(queryObj);

    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );

    let query = Product.find(JSON.parse(queryString));
    // 3. Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 4. Pagination
    //page=2&limit=10
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const tolDoc = await Product.countDocuments();
      if (skip >= tolDoc) {
        return res.status(400).json({
          status: 'This page is does not exists',
        });
      }
    }
    const products = await query;
    res.status(200).json({
      status: 'Success',
      products,
      totalDocs: products.length,
      resultPerPage: limit,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Unsuccessfull',
      err: error,
      message: error.message,
    });
  }
};
