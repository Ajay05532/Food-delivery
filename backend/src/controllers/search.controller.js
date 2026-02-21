import Restaurant from "../models/Restaurant.model.js";
import MenuItem from "../models/MenuItem.model.js";

export default async function search(req, res) {
  const q = req.query.q?.trim();

  if (!q) return res.json({ restaurants: [], items: [] });

  // Escape regex special chars (important!)
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "i");

  const [restaurants, items] = await Promise.all([
    Restaurant.find({ name: regex })
      .select("name coverImage avgRating")
      .limit(5),

    MenuItem.find({ name: regex })
      .populate("restaurant", "name minDeliveryTime maxDeliveryTime")
      .select("name price originalPrice image isVeg rating restaurant")
      .limit(10),
  ]);

  res.json({ restaurants, items });
}
