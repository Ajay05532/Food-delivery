const menuItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    index: true
  },

  name: { type: String, required: true },

  description: String,

  price: { type: Number, required: true },

  image: String,

  category: {
    type: String,
    index: true
  },

  isAvailable: { type: Boolean, default: true }

}, { timestamps: true });
