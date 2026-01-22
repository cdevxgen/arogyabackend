import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Generate JWT Token
 */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

/**
 * TEMP OTP STORE
 * ⚠️ Use Redis or DB in production
 */
const otpStore = new Map();

/**
 * ================================
 * SEND OTP (MSG91 SMS API – DLT SAFE)
 * ================================
 */
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Ensure 10-digit Indian number
    const mobile = phone.replace(/\D/g, "").slice(-10);
    if (mobile.length !== 10) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send SMS (DLT MATCHING TEXT)
    await axios.post(
      "https://control.msg91.com/api/v2/sendsms",
      {
        sender: "GURUAR",
        route: "4",
        country: "91",
        sms: [
          {
            message: `OTP is ${otp} - Arogya Guru`,
            to: [mobile],
          },
        ],
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // Store OTP with expiry (5 min)
    otpStore.set(mobile, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP Send Error:", err?.response?.data || err.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/**
 * ================================
 * VERIFY OTP
 * ================================
 */
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        message: "Phone number and OTP are required",
      });
    }

    const mobile = phone.replace(/\D/g, "").slice(-10);
    const record = otpStore.get(mobile);

    if (!record) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(mobile);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    otpStore.delete(mobile);

    // Find or create user
    let user = await User.findOne({ phone: mobile });
    if (!user) {
      user = await User.create({
        phone: mobile,
        username: `user_${mobile.slice(-6)}`,
        role: "user",
        authProviders: { phone: true },
      });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id, user.role),
      loginType: "otp",
    });
  } catch (err) {
    console.error("OTP Verify Error:", err?.response?.data || err.message);
    res.status(500).json({ message: "OTP verification failed" });
  }
};
