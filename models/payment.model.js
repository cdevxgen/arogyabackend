import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // optional if guest payment
    },

    amount: {
      type: Number,
      required: true,
    },

    razorpay_order_id: {
      type: String,
      required: true,
      index: true,
    },

    razorpay_payment_id: {
      type: String,
    },

    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
