import Order from "../models/Order.js";
import Cart from "../models/cart.model.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { address, paymentMethod } = req.body;

    // 1. Get user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // 2. Calculate total amount
    const totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    // 3. Create Order
    const newOrder = await Order.create({
      user: userId,
      restaurant: cart.restaurant,
      items: cart.items.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      address,
      paymentMethod: paymentMethod || "COD",
    });

    // 4. Clear Cart
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ user: userId })
      .populate("restaurant", "name coverImage address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Get User Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};
