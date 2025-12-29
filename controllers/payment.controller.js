import razorpay from "../configs/razorpay.config.js";
import crypto from "crypto";
import Payment from "../models/payment.model.js";

/**
 * CREATE RAZORPAY ORDER
 * POST /api/payment/order
 */
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, userId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // (optional) save order creation
    await Payment.create({
      userId,
      amount,
      razorpay_order_id: order.id,
      status: "created",
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

/**
 * VERIFY RAZORPAY PAYMENT
 * POST /api/payment/verify
 */
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        status: "failed",
        message: "Payment verification failed",
      });
    }

    // ✅ Update payment record
    await Payment.findOneAndUpdate(
      { razorpay_order_id },
      {
        razorpay_payment_id,
        status: "paid",
      }
    );

    res.status(200).json({
      status: "success",
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Payment Verify Error:", error);
    res.status(500).json({ message: "Verification error" });
  }
};
