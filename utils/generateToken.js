import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.CUSTOMER_JWT_SECRET, {
    expiresIn: "7d",
  });
};
