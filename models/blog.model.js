import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },

    slug: { type: String, required: true, unique: true },

    bannerImage: { type: String, required: true },

    author: { type: String, required: true },

    shortDescription: { type: String, required: true },

    content: { type: String, required: true }, // full blog HTML or Markdown

    tags: [String],

    publishedAt: { type: Date, default: Date.now },

    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
