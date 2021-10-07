import Order from "../models/order.js";

export const postOrder = async (req, res, next) => {
  try {
    if (req.body.orderItems.length === 0) {
      const error = new Error("Cart is empty");
      error.statusCode = 401;
      throw error;
    }
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const createdOrder = await order.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", order: createdOrder });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
