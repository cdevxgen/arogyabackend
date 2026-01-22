import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

/**
 * SEND OTP
 * Fix: Sends template_id and authkey as Query Params
 */
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone is required" });

    // MSG91 v5 requires template_id and authkey in params (URL), not body
    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      null, // Body is empty
      {
        params: {
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: phone,
          authkey: process.env.MSG91_AUTH_KEY,
          realTimeResponse: 1, // Optional: Force JSON response
        },
      }
    );

    // Check for logical error from MSG91 (even if status is 200)
    if (response.data.type === "error") {
      throw new Error(response.data.message);
    }

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP Send Error:", err?.response?.data || err.message);
    res
      .status(500)
      .json({ message: "OTP sending failed. Please check backend logs." });
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
