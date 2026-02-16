import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: String,
    pincode: String,
    landmark: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  { timestamps: true },
);

const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);
export default Address;
