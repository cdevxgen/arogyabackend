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
 * ================================
 * SEND OTP (MSG91 v5)
 * ================================
 */
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    // Validation
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Ensure 10-digit Indian mobile number
    const mobile = phone.replace(/\D/g, "").slice(-10);
    if (mobile.length !== 10) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    // Send OTP via MSG91
    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      null,
      {
        params: {
          mobile: mobile,
          template_id: process.env.MSG91_TEMPLATE_ID,
          authkey: process.env.MSG91_AUTH_KEY,
          realTimeResponse: 1,
        },
      }
    );

    // MSG91 logical error handling
    if (response?.data?.type === "error") {
      return res.status(400).json({
        message: response.data.message || "OTP request failed",
      });
    }

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("OTP Send Error:", err?.response?.data || err.message);

    res.status(500).json({
      message: "Failed to send OTP",
    });
  }
};

/**
 * ================================
 * VERIFY OTP (MSG91 v5)
 * ================================
 */
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Validation
    if (!phone || !otp) {
      return res.status(400).json({
        message: "Phone number and OTP are required",
      });
    }

    const mobile = phone.replace(/\D/g, "").slice(-10);
    if (mobile.length !== 10) {
      return res.status(400).json({
        message: "Invalid mobile number",
      });
    }

    // Verify OTP
    const verify = await axios.post(
      "https://control.msg91.com/api/v5/otp/verify",
      null,
      {
        params: {
          mobile: mobile,
          otp: otp,
          authkey: process.env.MSG91_AUTH_KEY,
        },
      }
    );

    if (verify?.data?.type !== "success") {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

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

    res.status(500).json({
      message: "OTP verification failed",
    });
  }
};
