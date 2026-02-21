import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  //  console.log("token: ",token);

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);

    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token expired or invalid" });
  }
};

export const optionalAuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);
    req.user = user;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

export default authMiddleware;
