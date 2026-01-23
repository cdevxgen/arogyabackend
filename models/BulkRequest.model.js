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

    notes: String,

    items: [bulkItemSchema],

    totalItemCount: Number,
    grandTotal: Number,

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BulkRequest", bulkRequestSchema);
