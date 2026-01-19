import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

/**
 * SEND OTP
 */
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone is required" });

    await axios.post("https://control.msg91.com/api/v5/otp", {
      mobile: phone,
      template_id: process.env.MSG91_TEMPLATE_ID,
      authkey: process.env.MSG91_AUTH_KEY,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "OTP sending failed" });
  }
};

/**
 * VERIFY OTP → LOGIN / REGISTER
 */
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const verify = await axios.post(
      "https://control.msg91.com/api/v5/otp/verify",
      {
        mobile: phone,
        otp,
        authkey: process.env.MSG91_AUTH_KEY,
      }
    );

    if (verify.data.type !== "success") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user = await User.findOne({ phone });

    // 🆕 Register if not exists
    if (!user) {
      user = await User.create({
        phone,
        username: `user_${phone.slice(-6)}`,
        role: "user",
        authProviders: { phone: true },
      });
    }

    res.json({
      _id: user._id,
      username: user.username,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id, user.role),
      loginType: "otp",
    });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed" });
  }
};
