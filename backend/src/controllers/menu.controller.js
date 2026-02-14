import MenuItem from "../models/MenuItem.model.js";
import mongoose from "mongoose";

const getMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID format" });
    }
    const menuItems = await MenuItem.find({ restaurant: restaurantId });

    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export default getMenu;
