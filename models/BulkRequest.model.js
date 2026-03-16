import mongoose from "mongoose";

const bulkItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["db", "manual"],
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    baseSku: String,
    finalSku: String,
    productName: String,
    variantDetails: String,
    image: String,

    quantity: {
      type: Number,
      required: true,
    },

    unitCost: {
      type: Number,
      required: true,
    },

    // --- NEW GST FIELDS FOR ITEMS ---
    baseTotal: {
      type: Number,
      default: 0,
    },
    gstPercent: {
      type: Number,
      default: 0,
    },
    gstAmount: {
      type: Number,
      default: 0,
    },
    // --------------------------------

    totalCost: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const bulkRequestSchema = new mongoose.Schema(
  {
    vendor: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed"],
      default: "Pending",
    },

    priority: {
      type: String,
      enum: ["Normal", "High", "Urgent"],
      default: "Normal",
    },

    expectedDelivery: Date,

    // --- NEW INVOICE TYPE FIELD ---
    invoiceType: {
      type: String,
      enum: ["with_gst", "without_gst"],
      default: "without_gst",
    },
    // ------------------------------

    notes: String,

    items: [bulkItemSchema],

    totalItemCount: Number,

    // --- NEW TOTAL CALCULATION FIELDS ---
    subTotal: {
      type: Number,
      default: 0,
    },
    totalGstAmount: {
      type: Number,
      default: 0,
    },
    // ------------------------------------
    
    grandTotal: Number,

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError in Next.js hot-reloads
export default mongoose.models.BulkRequest || mongoose.model("BulkRequest", bulkRequestSchema);