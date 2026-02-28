import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";
import axios from "axios";

const generateToken = (userID) => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const sendOtp = async (phone) => {
  // Generate a secure 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in Redis (5 min expiry)
  await redisClient.setex(`otp:${phone}`, 300, otp);

  // Send SMS via Fast2SMS (OTP route — no DLT registration needed)
  try {
    await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.FAST2SMS_KEY,
        variables_values: otp,
        route: "otp",
        numbers: phone,
      },
    });
  } catch (error) {
    throw new Error("Failed to send OTP. Please try again.");
  }

  return null;
};
/* Registration Controller */

const register = async (req, res) => {
  try {
    const { name, phone, email, role } = req.body;
    if (!name || !phone || !email) {
      return res.status(400).send("Name, phone, and email are required");
    }
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this phone number already exists" });
    }

    const devOtp = await sendOtp(phone);

    const pendingUserData = JSON.stringify({
      name,
      email,
      role: role || "user",
    });
    await redisClient.setex(`pending_user:${phone}`, 300, pendingUserData);

    res.status(200).json({
      message: "OTP sent successfully. Please verify.",
      ...(devOtp && { devOtp }),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Server error from register" });
  }
};

/* Login Controller */

const login = async (req, res) => {
  try {
    const { phone } = req.body;

    const existingUser = await User.findOne({ phone });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User does not exist. Please register first." });
    }

    const devOtp = await sendOtp(phone);

    res.status(200).json({
      message: "OTP sent successfully. Please verify.",
      ...(devOtp && { devOtp }),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Server error from login" });
  }
};

/* Verify OTP Controller */

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP are required" });
    }

    const storedOtp = await redisClient.get(`otp:${phone}`);

    if (!storedOtp) {
      return res.status(400).json({ message: "OTP expired or not requested" });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP matches, delete from Redis
    await redisClient.del(`otp:${phone}`);

    // Check if user exists (Login scenario)
    let user = await User.findOne({ phone });

    // If user doesn't exist, this is a registration scenario, check for pending details
    if (!user) {
      const pendingDataStr = await redisClient.get(`pending_user:${phone}`);
      if (!pendingDataStr) {
        return res.status(400).json({
          message: "Registration session expired. Please register again.",
        });
      }

      const pendingData = JSON.parse(pendingDataStr);
      user = await User.create({
        name: pendingData.name,
        phone,
        email: pendingData.email,
        role: pendingData.role,
      });

      await redisClient.del(`pending_user:${phone}`);
    }

    // Generate token
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "OTP verified successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Server error from verifyOtp" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Server error from logout" });
  }
};

/* Get Me Controller */

const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(200).json({ user: null });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(200).json({ user: null });
    }
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Server error from getMe" });
  }
};

export { register, login, logout, getMe, verifyOtp };
