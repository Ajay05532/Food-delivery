import Restaurant from "../models/Restaurant.model.js";
import Address from "../models/Address.model.js"; // Import to register the schema
import mongoose from "mongoose";

export const getRestaurants = async (req, res) => {
  try {
    // 1. Get page and limit from query parameters (defaults: page 1, limit 20)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    // 2. Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // 3. Fetch data with limit and skip
    // 3. Fetch data and populate the address field
    const restaurants = await Restaurant.find({ isOpen: true })
      .select(
        "name coverImage minDeliveryTime maxDeliveryTime avgRating address",
      )
      .populate("address", "city area street") // Only get the fields you need
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    // 4. Get total count to help Frontend know when to stop showing "Load More"
    const totalRestaurants = await Restaurant.countDocuments({ isOpen: true });

    res.json({
      success: true,
      data: restaurants,
      pagination: {
        total: totalRestaurants,
        currentPage: page,
        hasNextPage: skip + restaurants.length < totalRestaurants,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid restaurant ID format",
      });
    }

    // Fetch restaurant by ID and populate address
    const restaurant = await Restaurant.findById(id)
      .populate("address", "city area street pincode")
      .lean();

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
