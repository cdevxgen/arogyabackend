import Customer from "../models/customer.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../utils/generateToken.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* REGISTER */
export const registerCustomer = async (req, res) => {
  const { email, phone, password, name } = req.body;

  if (!email && !phone)
    return res.status(400).json({ message: "Email or phone required" });

  const exists = await Customer.findOne({
    $or: [{ email }, { phone }],
  });

  if (exists)
    return res.status(400).json({ message: "Customer already exists" });

  const customer = await Customer.create({
    email,
    phone,
    password,
    name,
  });

  res.status(201).json({
    id: customer._id,
    token: generateToken(customer._id),
  });
};

/* LOGIN (EMAIL / PHONE) */
export const loginCustomer = async (req, res) => {
  const { identifier, password } = req.body;

  const customer = await Customer.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  }).select("+password");

  if (!customer || !(await customer.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    id: customer._id,
    token: generateToken(customer._id),
  });
};

/* GOOGLE LOGIN */
export const googleLogin = async (req, res) => {
  const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, sub, name } = ticket.getPayload();

  let customer = await Customer.findOne({ email });

  if (!customer) {
    customer = await Customer.create({
      email,
      googleId: sub,
      name,
    });
  }

  res.json({
    id: customer._id,
    token: generateToken(customer._id),
  });
};

/* GET PROFILE */
export const getProfile = async (req, res) => {
  res.json(req.customer);
};

/* UPDATE PROFILE */
export const updateProfile = async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.customer._id,
    req.body,
    { new: true, runValidators: true }
  ).select("-password");

  res.json(customer);
};

/* CHANGE PASSWORD */
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const customer = await Customer.findById(req.customer._id).select(
    "+password"
  );

  if (!customer || !(await customer.matchPassword(currentPassword)))
    return res.status(400).json({ message: "Wrong current password" });

  customer.password = newPassword;
  await customer.save();

  res.json({ message: "Password changed successfully" });
};

/* FORGOT PASSWORD */
export const forgotPassword = async (req, res) => {
  const customer = await Customer.findOne({ email: req.body.email });
  if (!customer) return res.status(404).json({ message: "Customer not found" });

  const resetToken = customer.getResetToken();
  await customer.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: customer.email,
    subject: "Reset Password",
    html: `<a href="${resetUrl}">Reset Password</a>`,
  });

  res.json({ message: "Reset link sent" });
};

/* RESET PASSWORD */
export const resetPassword = async (req, res) => {
  const hashed = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const customer = await Customer.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!customer)
    return res.status(400).json({ message: "Invalid or expired token" });

  customer.password = req.body.password;
  customer.resetPasswordToken = undefined;
  customer.resetPasswordExpire = undefined;

  await customer.save();

  res.json({ message: "Password reset successful" });
};

/* DELETE ACCOUNT */
export const deleteAccount = async (req, res) => {
  await Customer.findByIdAndDelete(req.customer._id);
  res.json({ message: "Account deleted successfully" });
};

// ---------- Get All Customers (Admin Only) ----------
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
      .select("-password -resetPasswordToken -resetPasswordExpire")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
