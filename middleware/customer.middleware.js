import jwt from "jsonwebtoken";
import Customer from "../models/customer.model.js";

export const customerProtect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.CUSTOMER_JWT_SECRET);
    req.customer = await Customer.findById(decoded.id).select("-password");

    if (!req.customer)
      return res.status(401).json({ message: "Customer not found" });

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
