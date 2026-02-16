import User from "../models/user.model.js";

export const createAddress = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: req.body } },
      { new: true },
    );

    res.status(201).json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to add address", error });
  }
};

/* ----------------------------- */
/* Get Single Address            */
/* ----------------------------- */
export const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const user = await User.findOne(
      { _id: userId, "addresses._id": addressId },
      { "addresses.$": 1 },
    );

    if (!user || !user.addresses || user.addresses.length === 0) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json(user.addresses[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch address", error });
  }
};
/* ----------------------------- */
/* Get All Addresses of User     */
/* ----------------------------- */
export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("addresses");
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch addresses", error });
  }
};

/* ----------------------------- */
/* Update Address                */
/* ----------------------------- */
export const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update fields
    Object.assign(address, req.body);

    await user.save();

    res.json({ message: "Address updated", address });
  } catch (error) {
    res.status(500).json({ message: "Failed to update address", error });
  }
};

/* ----------------------------- */
/* Delete Address                */
/* ----------------------------- */
export const deleteAddress = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { addresses: { _id: req.params.id } },
    });

    res.json({ message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete address", error });
  }
};

/* ----------------------------- */
/* Set Default Address           */
/* ----------------------------- */
export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    // Remove old default
    await User.updateOne(
      { _id: userId },
      { $set: { "addresses.$[].isDefault": false } },
    );

    // Set new default
    await User.updateOne(
      { _id: userId, "addresses._id": addressId },
      { $set: { "addresses.$.isDefault": true } },
    );

    res.json({ message: "Default address set" });
  } catch (error) {
    res.status(500).json({ message: "Failed to set default", error });
  }
};
