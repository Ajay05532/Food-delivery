import express from "express";
import Cart from "../models/cart.model.js";

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "restaurant",
      "name image",
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { menuItemId, name, image, category, price, quantity, restaurantId } =
      req.body;

    console.log("📥 Add to cart request:", {
      menuItemId,
      name,
      category,
      price,
      quantity,
      restaurantId,
      userId: req.user?.id,
    });

    // Validate required fields
    if (
      !menuItemId ||
      !name ||
      !category ||
      !price ||
      !quantity ||
      !restaurantId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        user: req.user.id,
        restaurant: restaurantId,
        items: [
          {
            menuItemId,
            name,
            image,
            category,
            price,
            quantity,
          },
        ],
      });
    } else {
      // Check if cart has items from different restaurant
      if (cart.restaurant.toString() !== restaurantId) {
        return res.status(400).json({
          message:
            "Cannot add items from different restaurants. Please clear your cart first.",
        });
      }

      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.menuItemId.toString() === menuItemId.toString(),
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({
          menuItemId,
          name,
          image,
          category,
          price,
          quantity,
        });
      }

      await cart.save();
    }

    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    console.error("Error stack:", error.stack);
    console.error("Error message:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { menuItemId } = req.params;
    const { quantity } = req.body;

    // Validate quantity
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.menuItemId.toString() === menuItemId.toString(),
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cart item updated successfully", cart });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const clearCart = async (req, res) => {
  try {
    // Find and delete user's cart
    const cart = await Cart.findOneAndDelete({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { menuItemId } = req.params;

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.menuItemId.toString() === menuItemId.toString(),
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove item from cart
    cart.items.splice(itemIndex, 1);

    // If cart is empty, delete it
    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ message: "Item removed and cart deleted" });
    }

    await cart.save();
    res
      .status(200)
      .json({ message: "Item removed from cart successfully", cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getCart, addToCart, updateCartItem, clearCart, removeFromCart };
