import mongoose from "mongoose";

const { Schema } = mongoose;

// ✅ Variant Schema
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

// ✅ Image Schema
const imageSchema = new Schema(
  {
    _id: { type: String },
    img: { type: String, required: true },
  },
  { _id: false }
);

// ✅ Category Schema
const categorySchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

// ✅ Offer Date Schema
const offerDateSchema = new Schema(
  {
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { _id: false }
);

// ✅ Additional Info (Ingredients, Benefits, etc.)
const infoSchema = new Schema(
  {
    key: { type: String },
    value: { type: String },
  },
  { _id: false }
);

// ✅ Shipping Info
const shippingSchema = new Schema(
  {
    weight: { type: String },
    dimensions: { type: String },
    deliveryTime: { type: String },
  },
  { _id: false }
);

// ✅ SEO Schema
const seoSchema = new Schema(
  {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
  },
  { _id: false }
);

// ✅ Review Schema
const reviewSchema = new Schema(
  {
    userId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

// ✅ Main Product Schema
const productSchema = new Schema(
  {
    sku: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    category: categorySchema,
    img: { type: String, required: true },
    imageURLs: [imageSchema],
    variants: [variantSchema],
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
    videoId: { type: String }, // ✅ added
    reviews: [reviewSchema], // ✅ added
    seo: seoSchema,
  },
  { timestamps: true }
);

// ✅ Text Index for Search
productSchema.index({ title: "text", tags: "text", description: "text" });

// ✅ Model Export
export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
