const Cart = require('./../Models/CartModel');
const Product = require('./../Models/ProductModel');
exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req?.user?._id });
    if (!cart) {
      return res.status(400).json({
        status: 'Unsuccessful',
        message: 'No cart please add items',
      });
    }

    let items = await Promise.all(
      cart.items.map(async item => {
        const product = await Product.findById(item.item);
        const qty = item.qty;
        return { product, qty };
      })
    );

    res.status(200).json({
      status: 'Success',
      cart,
      items,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Unsuccessful',
      error,
    });
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { cartDetails, price } = req?.body;

    let cart = await Cart.findOne({ user: req?.user?._id });
    if (cart) {
      const findIndex = cart.items.findIndex(ele =>
        ele.item.equals(cartDetails.id)
      );
      if (findIndex !== -1) {
        cart.items[findIndex].qty += 1;
      } else {
        cart.items.push({ item: cartDetails.id, qty: 1 });
      }
      cart.totalPrice += price;
      cart.totalQty += 1;
    } else {
      cart = new Cart({
        user: req?.user?._id,
        items: { item: cartDetails.id, qty: 1 },
        totalPrice: price,
        totalQty: 1,
      });
    }

    await cart.save();
    res.status(200).json({
      status: 'Successful',
      message: 'added to cart',
      totalPrice: cart.totalPrice,
      totalQty: cart.totalQty,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Unsuccessful',
      error,
    });
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req?.user });
    if (!cart) {
      return res.status(400).json({
        status: 'Unsuccessful',
        message: 'No cart please add items',
      });
    }
    const findIndex = cart.items.findIndex(item =>
      item.item.equals(req?.body?.product_id)
    );
    if (req.body.inc) {
      console.log(cart.items[findIndex].qty);
      if (findIndex !== -1) {
        cart.items[findIndex].qty += 1;
      }
    } else {
      if (cart.items[findIndex].qty <= 1) return;
      if (findIndex !== -1) {
        cart.items[findIndex].qty -= 1;
      }
    }
    await cart.save();

    res.status(200).json({
      status: 'Successfull',
      message: 'Increased cart',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Unsuccessful',
      error,
    });
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req?.user?._id });
    if (!cart) {
      return res.status(400).json({
        status: 'Unsuccessful',
        message: 'No cart please add items',
      });
    }

    if (cart) {
      const findIndex = cart.items.findIndex(ele =>
        ele.item.equals(req?.body?.product_id)
      );
      if (findIndex !== -1) {
        cart.items.pop(findIndex);
      }
      cart.totalQty -= 1;
    }
    await cart.save({ validateBeforeSave: true });
    res.status(200).json({
      status: 'Success',
      message: 'Removed product form cart',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Unsuccessful',
      error,
    });
  }
};
