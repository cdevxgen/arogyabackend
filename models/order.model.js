import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    /* ===============================
       🔗 USER RELATION
    =============================== */
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },

    /* ===============================
       👤 CUSTOMER DETAILS
    =============================== */
    customerDetails: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      // Storing the full name often helps with logistics labels
      name: { type: String },
      email: { type: String, required: true, lowercase: true },
      phone: { type: String, required: true },
    },

    /* ===============================
       🚚 SHIPPING ADDRESS
    =============================== */
    shippingAddress: {
      name: { type: String }, // Added to match Shiprocket payload
      phone: { type: String }, // Added to match Shiprocket payload
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      // Changed to Number because Shiprocket requires Int
      pincode: { type: Number, required: true },
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
        variantLabel: { type: String },
        flavorName: { type: String },
        image: { type: String },

        // Standard Internal Fields
        quantity: { type: Number, required: true, min: 1 },
        pricePerUnit: { type: Number, required: true },

        // --- SHIPROCKET SPECIFIC FIELDS ---
        sku: { type: String, default: "" },
        units: { type: Number }, // Maps to quantity
        selling_price: { type: Number }, // Maps to pricePerUnit
        discount: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },

        // Dimensions & Weight (Crucial for Shipping Calculation)
        length: { type: Number, default: 10 },
        breadth: { type: Number, default: 10 },
        height: { type: Number, default: 10 },
        weight: { type: Number, default: 0.5 },
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
      // Updated to match the frontend "Prepaid" which Shiprocket prefers over "Online Payment"
      enum: ["Cash on Delivery", "Online Payment", "Prepaid", "COD"],
      default: "Cash on Delivery",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
      index: true,
    },

    transactionId: { type: String, default: null },

    /* ===============================
       📦 ORDER STATUS
    =============================== */
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Confirmed",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
        "RTO", // Added RTO as it's common in logistics
      ],
      default: "Pending",
      index: true,
    },

    /* ===============================
       📝 ADDITIONAL INFO
    =============================== */
    additionalInfo: {
      notes: { type: String },
      orderSource: { type: String, default: "web" },
      ipAddress: { type: String },
      // Optional: Store the specific string date sent to Shiprocket if needed for debugging
      shiprocketOrderDate: { type: String },
    },

    /* ===============================
       🚀 LOGISTICS TRACKING (Shiprocket)
    =============================== */
    tracking: {
      shipmentId: { type: String },
      orderId: { type: String }, // Shiprocket's internal Order ID
      awbCode: { type: String },
      courierName: { type: String },
      status: { type: String }, // e.g., "PICKED UP", "IN TRANSIT"
      history: { type: Array, default: [] },
    },

    // Legacy support (optional, can be removed if strictly using tracking object)
    trackingNumber: { type: String, default: null },
    courierPartner: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* ===============================
   📌 INDEXES
=============================== */
orderSchema.index({ createdAt: -1 });
orderSchema.index({ customerId: 1, createdAt: -1 });
orderSchema.index({ "tracking.awbCode": 1 }); // Useful for tracking lookups

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
