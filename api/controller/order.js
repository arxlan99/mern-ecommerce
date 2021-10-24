import Order from "../models/order.js";

export const postOrder = async (req, res, next) => {
  try {
    if (req.body.orderItems.length === 0) {
      const error = new Error("Cart is empty");
      error.statusCode = 401;
      throw error;
    }

    const order = new Order({
      seller: req.body.orderItems[0].seller,
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user.id,
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

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ order: order });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getMineOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({ orders: orders });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const seller = req.query.seller || "";
    const setFilter = seller ? { seller } : {};

    const orders = await Order.find({...setFilter}).populate("user", "name");

    res.status(200).json({ orders: orders });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }
    const deleteOrder = await order.remove();
    res
      .status(200)
      .json({ message: "Order deleted successfully", order: deleteOrder });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deliverOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res
      .status(200)
      .json({ message: "Order delivered successfully", order: updatedOrder });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
