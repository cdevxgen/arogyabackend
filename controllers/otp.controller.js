import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

/**
 * SEND OTP
 * FIX: Moves template_id and authkey from Body to Query Params
 */
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    // 1. Log to server console to debug (Check your terminal when you click send)
    console.log("Attempting to send OTP to:", phone);
    console.log("Using Template ID:", process.env.MSG91_TEMPLATE_ID);

    if (!phone) return res.status(400).json({ message: "Phone is required" });
    if (!process.env.MSG91_TEMPLATE_ID) {
      console.error("ERROR: MSG91_TEMPLATE_ID is missing in .env file");
      return res.status(500).json({ message: "Server Configuration Error" });
    }

    // 2. Correct MSG91 v5 Request Format
    // We send 'null' as the second argument (body)
    // We send parameters in the third argument (params)
    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      null,
      {
        params: {
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: phone,
          authkey: process.env.MSG91_AUTH_KEY,
          realTimeResponse: 1,
        },
      }
    );

    console.log("MSG91 Response:", response.data);

    if (response.data.type === "error") {
      throw new Error(response.data.message);
    }

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    // Detailed error logging
    console.error("OTP Send Failed:", err?.response?.data || err.message);
    res.status(500).json({
      message: err?.response?.data?.message || "OTP sending failed",
    });
  }
};

/**
 * VERIFY OTP
 */
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const verify = await axios.post(
      "https://control.msg91.com/api/v5/otp/verify",
      null,
      {
        params: {
          mobile: phone,
          otp: otp,
          authkey: process.env.MSG91_AUTH_KEY,
        },
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
    console.error("OTP Verify Error:", err?.response?.data || err.message);
    res.status(500).json({ message: "OTP verification failed" });
  }
};
