const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        item: mongoose.Schema.Types.ObjectId,
        qty: Number,
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
      enum: {
        values: ['COD', 'CARD'],
        message: 'Please the COD',
      },
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    shippingAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      enum: {
        values: ['Not paid', 'Processing', 'Shipped', 'Delivered'],
        message: 'Please select the orderStatus',
      },
      default: 'Processing',
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
