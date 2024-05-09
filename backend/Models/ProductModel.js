const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product must have name'],
    },
    description: {
      type: String,
      required: [true, 'Product must have description'],
    },
    price: {
      type: Number,
      required: [true, 'Product must have price'],
    },
    discountPercentage: {
      type: Number,
      required: [true, 'Product must have discountPercentage'],
    },
    rating: {
      type: Number,
      required: [true, 'Product must have rating'],
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Product must have stock'],
      default: 1,
    },
    brand: {
      type: String,
      required: [true, 'Product must have brand'],
    },
    category: {
      type: String,
      required: [true, 'Product must have brand'],
      enum: {
        values: [
          'smartphones',
          'laptops',
          'fragrances',
          'skincare',
          'groceries',
          'home-decoration',
          'furniture',
          'tops',
          'womens-dresses',
          'womens-shoes',
          'mens-shirts',
          'mens-shoes',
          'mens-watches',
          'womens-watches',
          'womens-bags',
          'womens-jewellery',
          'sunglasses',
          'automotive',
          'motorcycle',
          'lighting',
        ],
        message: 'Please select the category',
      },
    },
    thumbnail: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
