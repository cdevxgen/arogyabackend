import mongoose from "mongoose";

const ProductInterestSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // Mapped from category.value
    name: { type: String, required: true }, // Mapped from category.label
    type: {
      type: String,
      enum: ["soup", "malt"],
      required: true,
      default: "soup", // Default fallback
    },
  },
  { _id: false }
);

const quoteRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true, default: "" },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    location: { type: String, required: true },

    // --- ADDED MISSING FIELD ---
    locationUrl: { type: String, trim: true, default: "" },

    eventDate: { type: Date, required: true },
    guestCount: { type: Number, required: true, min: 10 },

    // This matches the complex object structure
    productInterest: { type: ProductInterestSchema, required: true },

    status: {
      type: String,
      enum: ["new", "contacted", "confirmed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("QuoteRequest", quoteRequestSchema);
