import axios from "axios";
import Customer from "../models/customer.model.js"; // ✅ CHANGED: Import Customer, not User
import { generateToken } from "../utils/generateToken.js"; // ✅ Use the same token generator as Email/Google login

/**
 * ================================
 * SEND OTP (MSG91 v5)
 * ================================
 */
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone required" });

    // 1. Format Mobile (India)
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    const mobileWithCountryCode = "91" + cleanPhone;

    console.log(`Sending OTP to: ${mobileWithCountryCode}`);

    // 2. Send OTP via MSG91
    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      {},
      {
        params: {
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: mobileWithCountryCode,
          authkey: process.env.MSG91_AUTH_KEY,
          realTimeResponse: 1,
        },
      }
    );

    if (response.data.type === "error") {
      console.error("MSG91 Error:", response.data);
      return res.status(400).json({ message: response.data.message });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Server Error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to send OTP" });
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

    // 1. Standardize phone format
    const mobileClean = phone.replace(/\D/g, "").slice(-10);
    const mobileWithCountryCode = "91" + mobileClean;

    // 2. Verify OTP with MSG91
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

    // 3. Database Logic (Using CUSTOMER model)
    let customer = await Customer.findOne({ phone: mobileClean });

    if (!customer) {
      // Create new customer if they don't exist
      customer = await Customer.create({
        phone: mobileClean,
        // Set a default name if it doesn't exist
        name: `User ${mobileClean.slice(-4)}`,
        email: "", // Optional: handle empty email in your schema
        isVerified: true, // Mark as verified since OTP passed
      });
    }

    // 4. Generate Token & Response
    // IMPORTANT: Ensure generateToken matches what your middleware expects
    res.status(200).json({
      id: customer._id,
      name: customer.name,
      phone: customer.phone,
      token: generateToken(customer._id), // ✅ Token for Customer
    });
  } catch (err) {
    console.error("Verify Error:", err.response?.data || err.message);
    res.status(500).json({ message: "OTP verification failed" });
  }
};
