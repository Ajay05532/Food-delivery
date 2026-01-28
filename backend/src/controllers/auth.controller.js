import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userID) => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/* Registration Controller */

const register = async(req, res) => {

  try {
    const { name, phone, email, role } = req.body;
    if(!name || !phone || !email) {
      return res.status(400).send("Name, phone, and email are required");
    }
    const existingUser = await User.findOne({phone});
    if(existingUser) {
      return res.status(400).json({message: "User with this phone number already exists"});
    }
    // Create user on MongoDB
    const user = await User.create({
      name, 
      phone, 
      email, 
      role: role || "user"
    });

    // genereate the token with user's id
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    
    res.status(201).json({message: "User registered successfully", user});
  }
  catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({message: "Server error from register"});
  }
}

/* Login Controller */

const login = async(req, res) => {

  try {
    const {phone} = req.body;
   
    const existingUser = await User.findOne({phone});
    if(!existingUser) {
      return res.status(400).json({message: "User does not exist"});
    }
    const user = existingUser;

    // genereate the token with user's id
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });


    res.status(200).json({message: "User logged in successfully", user});
  }
  catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({message: "Server error fromm login"});
  }
}

const logout = async(req, res) =>{
  try{
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    res.status(200).json({message: "User logout successfully"})
  }
  catch(error){
    console.error("Error registering user:", error);
    res.status(500).json({message: "Server error fromm logout"});
  }
}

export { register, login , logout};