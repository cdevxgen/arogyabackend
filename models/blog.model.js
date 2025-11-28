import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    slug: { type: String, required: true, unique: true },

    // --- ADD THIS LINE ---
    category: { type: String, required: true },
    // --------------------

    bannerImage: { type: String, required: true },
    author: { type: String, required: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String],
    publishedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },

    // Optional: SEO Meta fields if you want to save them
    meta: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      canonicalUrl: String,
    },

    // Optional: Stats if you want to track views
    stats: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
    },

    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
