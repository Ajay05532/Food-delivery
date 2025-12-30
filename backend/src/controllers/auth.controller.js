import express from "express";
import User from "../models/user.model.js";

const register = async(req, res) => {

  try {
    const { name, phone, email, role } = req.body;
    if(!name || !phone || !email) {
      return res.status(400).send("Name, phone, and email are required");
    }
    const existingUser = await User.findOne({phone});
    if(existingUser) {
      return res.status(400).send("User already exists");
    }
    const user = await User.create({name, phone, email, role});
    res.status(201).json({message: "User registered successfully", user});
  }
  catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Server error");
  }
}



const login = async(req, res) => {

  try {
    const {phone, role } = req.body;
   
    const existingUser = await User.findOne({phone});
    if(!existingUser) {
      return res.status(400).send("User does not exist");
    }
    const user = existingUser;
    res.status(201).json({message: "User logged in successfully", user});
  }
  catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Server error");
  }
}
export { register, login };