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

    // 1. Basic Validation
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // 2. Format Mobile Number for India (91 + 10 digits)
    // This removes non-digits, takes the last 10, and prepends 91
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);

    if (cleanPhone.length !== 10) {
      return res
        .status(400)
        .json({ message: "Invalid mobile number. Please enter 10 digits." });
    }

    const mobileWithCountryCode = `91${cleanPhone}`;

    // 3. Send OTP via MSG91
    // We pass the new Template ID from .env here
    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      null,
      {
        params: {
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: mobileWithCountryCode,
          authkey: process.env.MSG91_AUTH_KEY,
          realTimeResponse: 1, // Optional: forces JSON response
        },
      }
    );

    // 4. Handle MSG91 Specific Errors
    if (response.data.type === "error") {
      console.error("MSG91 Error:", response.data);
      return res.status(400).json({
        message: response.data.message || "OTP request failed at provider",
      });
    }

    res.status(200).json({
      message: "OTP sent successfully",
      // Optional: For debugging only, remove in production!
      // debugInfo: response.data
    });
  } catch (err) {
    // Axios error handling
    console.error(
      "OTP Send Controller Error:",
      err.response?.data || err.message
    );
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

    // 1. Validation
    if (!phone || !otp) {
      return res.status(400).json({
        message: "Phone number and OTP are required",
      });
    }

    // 2. Format Mobile (Must match the format sent in sendOtp)
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    const mobileWithCountryCode = `91${cleanPhone}`;

    // 3. Verify OTP via MSG91
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

    // 4. Check Verification Result
    if (verify.data.type !== "success") {
      return res.status(400).json({
        message: verify.data.message || "Invalid or expired OTP",
      });
    }

    // 5. Login / Signup Logic
    let user = await User.findOne({ phone: cleanPhone }); // Store generic 10 digit in DB

    if (!user) {
      user = await User.create({
        phone: cleanPhone,
        username: `user_${cleanPhone.slice(-6)}`,
        role: "user",
        authProviders: { phone: true },
      });
    }

    // 6. Return Token
    res.status(200).json({
      _id: user._id,
      username: user.username,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id, user.role),
      loginType: "otp",
    });
  } catch (err) {
    console.error("OTP Verify Error:", err.response?.data || err.message);
    res.status(500).json({
      message: "OTP verification failed",
    });
  }
};
