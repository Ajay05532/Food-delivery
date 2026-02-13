import Restaurant from "../models/Restaurant.model.js";
import Address from "../models/Address.model.js"; // Import to register the schema

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
    console.error("❌ Error in getRestaurants:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
