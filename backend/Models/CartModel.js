// CustomerId,items - > item,qty, totalPrice, totalQty
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      qty: {
        type: Number,
        required: [true, 'Quantity must be required'],
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  totalQty: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
