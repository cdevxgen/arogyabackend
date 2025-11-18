import mongoose from "mongoose";

const { Schema } = mongoose;

// ----------------------
// Variant Schema (WEIGHT)
// ----------------------
const variantSchema = new Schema(
  {
    variantId: { type: String, required: true },
    label: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    unit: { type: String, default: "1 pack" },
  },
  { _id: false }
);

// ----------------------
// Flavor Variant Schema (OPTIONAL)
// ----------------------
const flavorSchema = new Schema(
  {
    flavorId: { type: String },
    name: { type: String },
    slug: { type: String },
    price: { type: Number },
    finalPrice: { type: Number },
    stock: { type: Number, default: 0 },
  },
  { _id: false }
);

// ----------------------
// Image Schema
// ----------------------
const imageSchema = new Schema(
  {
    _id: { type: String },
    img: { type: String, required: true },
  },
  { _id: false }
);

// ----------------------
// Category Schema
// ----------------------
const categorySchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

// ----------------------
// Offer Date Schema
// ----------------------
const offerDateSchema = new Schema(
  {
    startDate: { type: Date },
    endDate: { type: Date },
    offers: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String },
      },
    ],
  },
  { _id: false }
);

// ----------------------
// Additional Info Schema
// ----------------------
const infoSchema = new Schema(
  {
    key: { type: String },
    value: { type: String },
  },
  { _id: false }
);

// ----------------------
// Shipping Info Schema
// ----------------------
const shippingSchema = new Schema(
  {
    weight: { type: String },
    dimensions: { type: String },
    deliveryTime: { type: String },
  },
  { _id: false }
);

// ----------------------
// SEO Schema
// ----------------------
const seoSchema = new Schema(
  {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
  },
  { _id: false }
);

// ----------------------
// Review Schema
// ----------------------
const reviewSchema = new Schema(
  {
    userId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

// ----------------------
// PRODUCT SCHEMA (FINAL)
// ----------------------
const productSchema = new Schema(
  {
    sku: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },

    category: categorySchema,

    img: { type: String, required: true },
    imageURLs: [imageSchema],

    // ⭐ Weight variants
    variantone: {
      type: [variantSchema],
      required: true,
      default: [],
    },

    // ⭐ Flavor variants (OPTIONAL)
    varianttwo: {
      type: [flavorSchema],
      default: [], // If no flavor → safe
    },

    status: {
      type: String,
      enum: ["in-stock", "out-of-stock", "preorder"],
      default: "in-stock",
    },

    offerDate: offerDateSchema,

    description: { type: String, required: true },
    additionalInformation: [infoSchema],

    shippingInfo: shippingSchema,

    featured: { type: Boolean, default: false },
    tags: [String],
    videoId: { type: String },

    reviews: [reviewSchema],

    seo: seoSchema,
  },
  { timestamps: true }
);

productSchema.index({ title: "text", tags: "text", description: "text" });

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
