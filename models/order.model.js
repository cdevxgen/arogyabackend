import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },

    shippingAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" },
    },

    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        variantLabel: { type: String },
        flavorName: { type: String },
        quantity: { type: Number, required: true },
        pricePerUnit: { type: Number, required: true },
        image: { type: String },
      },
    ],

    // 💰 Financials
    subtotal: { type: Number, required: true }, // BEFORE discount
    discountAmount: { type: Number, default: 0 }, // discount value
    totalAmount: { type: Number, required: true }, // AFTER discount

    // 🎟 Coupon Info
    couponCode: { type: String, default: null },

    // 💳 Payment Details
    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
      enum: ["Cash on Delivery", "Online Payment"],
    },

    paymentStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Paid", "Failed"],
    },

    transactionId: { type: String, default: null },

    // 📦 Order Progress
    orderStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    },

    // 📝 Additional Info
    additionalInfo: {
      notes: { type: String },
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
