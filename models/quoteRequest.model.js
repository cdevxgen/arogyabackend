import mongoose from "mongoose";

const ProductInterestSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true, // soup_id or malt_id
    },
    name: {
      type: String,
      required: true, // readable label
    },
    type: {
      type: String,
      enum: ["soup", "malt"],
      required: true,
    },
  },
  { _id: false }
);

const quoteRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },

    location: {
      type: String,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    guestCount: {
      type: Number,
      required: true,
      min: 10,
    },

    productInterest: {
      type: ProductInterestSchema,
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "confirmed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("QuoteRequest", quoteRequestSchema);
