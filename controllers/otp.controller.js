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

    // 1. Validation
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // 2. Clean Phone Number
    // Use the last 10 digits to ensure we don't duplicate country codes
    // Input: "919164398736" -> Clean: "9164398736"
    const mobileClean = phone.replace(/\D/g, "").slice(-10);

    if (mobileClean.length !== 10) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    // 3. Add Country Code for MSG91 (91 for India)
    const mobileWithCountryCode = "91" + mobileClean;

    console.log("Sending OTP to:", mobileWithCountryCode);
    console.log("Using Template ID:", process.env.MSG91_TEMPLATE_ID);

    // 4. Send Request
    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      null, // Body is null for query params
      {
        params: {
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: mobileWithCountryCode,
          authkey: process.env.MSG91_AUTH_KEY,
          realTimeResponse: 1,
        },
      }
    );

    // 5. Handle Provider Errors
    if (response.data.type === "error") {
      console.error("MSG91 API Error:", response.data);
      return res.status(400).json({
        message: response.data.message || "Template ID error or DLT mismatch",
      });
    }

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("Server Error:", err.response?.data || err.message);
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

    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP required" });
    }

    // Standardize phone format (same as sendOtp)
    const mobileClean = phone.replace(/\D/g, "").slice(-10);
    const mobileWithCountryCode = "91" + mobileClean;

    // Verify API
    const verify = await axios.get(
      "https://control.msg91.com/api/v5/otp/verify",
      {
        params: {
          mobile: mobileWithCountryCode,
          otp: otp,
          authkey: process.env.MSG91_AUTH_KEY,
        },
      }
    );

    if (verify.data.type !== "success") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Database Logic
    let user = await User.findOne({ phone: mobileClean });

    if (!user) {
      user = await User.create({
        phone: mobileClean,
        username: `user_${mobileClean.slice(-6)}`,
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
    console.error("Verify Error:", err.response?.data || err.message);
    res.status(500).json({ message: "OTP verification failed" });
  }
};
