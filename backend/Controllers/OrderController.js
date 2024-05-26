const { findOne, findById } = require('../Models/UserModel');
const Order = require('./../Models/OrderModel');
const client = require('./../redisServer');
const Product = require('./../Models/ProductModel');
const Cart = require('./../Models/CartModel');
exports.newOrder = async (req, res, next) => {
  try {
    const user = req?.user?._id;
    req.body.user = user;
    const newOrder = await Order.create(req.body);
    if (!newOrder) {
      console.log('not created');
      return res.status(400).json({
        message: 'Please try again',
        status: 'Unsuccessful',
      });
    }
    const cart = await Cart.findOne({ user: req?.user?._id });
    newOrder.orderItems.forEach(async item => {
      const index = cart.items.findIndex(items => items.item.equals(item.item));
      if (index !== -1) {
        cart.items.pop(index);
        cart.totalPrice = 0;
        cart.totalQty = 0;
      }
    });

    await cart.save({ validateBeforeSave: true });

    console.log('Success');
    res.status(200).json({
      status: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      error,
      status: 'Unsuccessful',
    });
  }
};

exports.getOrderDetails = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Check if the order exists in cache
    const cachedOrder = await client.get(`orders:${id}`);
    if (cachedOrder) {
      const order = JSON.parse(cachedOrder);
      const products = await Promise.all(
        order?.orderItems.map(async item => {
          return await Product.findById(item.item);
        })
      );

      console.log(products);
      return res.status(200).json({
        status: 'Order details',
        order,
        products,
      });
    }

    // If not in cache, retrieve from database
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
        status: 'Unsuccessful',
      });
    }

    // Store in cache
    await client.set(`orders:${id}`, JSON.stringify(order));
    const products = await Promise.all(
      order?.orderItems.map(async item => {
        return await Product.findById(item.item);
      })
    );

    console.log(products);
    // Respond with order details
    res.status(200).json({
      status: 'Order details',
      order,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 'Unsuccessful',
    });
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req?.user?._id });
    console.log(order);
    if (!order) {
      return res.status(400).json({
        message: 'Please try again',
        status: 'Unsuccessful',
      });
    }
    res.status(201).json({
      status: 'Order details',
      order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error,
      status: 'Unsuccessful',
    });
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(400).json({
        message: 'Please try again',
        status: 'Unsuccessful',
      });
    }

    res.status(201).json({
      status: 'Order details',
      orders,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error,
      status: 'Unsuccessful',
    });
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    req.body.user = req?.user?._id;
    const order = await Order.findByIdAndUpdate(id, req.body);
    await order.save({ validateBeforeSave: true });
    res.status(200).json({
      message: 'Updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error,
      status: 'Unsuccessful',
    });
  }
};

// exports.updateOrderQty = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const order = await findById(id);
//     if (!order) {
//       return res.status(400).json({
//         message: 'Please try again',
//         status: 'Unsuccessful',
//       });
//     }
//     if (order.orderStatus === 'Delivered') {
//       return res.status(400).json({
//         status: 'Already delivered your order',
//       });
//     }
//     const qty = req.body.quantity;
//     order?.orderItems.forEach(item => {
//       const product
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//       error,
//       status: 'Unsuccessful',
//     });
//   }
// };
