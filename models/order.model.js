import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    /* ===============================
       🔗 USER RELATION
    =============================== */
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // or "User" based on your auth model
      required: true,
      index: true,
    },

    /* ===============================
       👤 CUSTOMER DETAILS
    =============================== */
    customerDetails: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true },
      phone: { type: String, required: true },
    },

    /* ===============================
       🚚 SHIPPING ADDRESS
    =============================== */
    shippingAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" },
    },

    /* ===============================
       🛒 ORDER ITEMS
    =============================== */
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: { type: String, required: true },
        variantLabel: { type: String }, // weight / size
        flavorName: { type: String },
        quantity: { type: Number, required: true, min: 1 },
        pricePerUnit: { type: Number, required: true },
        image: { type: String },
      },
    ],

    /* ===============================
       💰 FINANCIALS
    =============================== */
    subtotal: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    /* ===============================
       🎟 COUPON DETAILS
    =============================== */
    couponCode: { type: String, default: null },
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },

    /* ===============================
       💳 PAYMENT DETAILS
    =============================== */
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Online Payment"],
      default: "Cash on Delivery",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
      index: true,
    },

    transactionId: { type: String, default: null },

    paymentGateway: {
      type: String,
      enum: ["razorpay", "stripe", "cashfree", "manual"],
      default: null,
    },

    /* ===============================
       📦 ORDER STATUS
    =============================== */
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      default: "Pending",
      index: true,
    },

    trackingNumber: { type: String, default: null },
    courierPartner: { type: String, default: null },

    /* ===============================
       📝 ADDITIONAL INFO
    =============================== */
    additionalInfo: {
      notes: { type: String },
      orderSource: {
        type: String,
        enum: ["web", "mobile"],
        default: "web",
      },
      ipAddress: { type: String },
    },

    /* ===============================
       🔁 REFUND INFO (FUTURE SAFE)
    =============================== */
    refund: {
      refunded: { type: Boolean, default: false },
      refundAmount: { type: Number, default: 0 },
      refundTransactionId: { type: String },
      refundedAt: { type: Date },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* ===============================
   📌 INDEXES (PERFORMANCE)
=============================== */
orderSchema.index({ createdAt: -1 });
orderSchema.index({ customerId: 1, createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
