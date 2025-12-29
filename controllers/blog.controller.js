import Blog from "../models/blog.model.js";
import slugify from "slugify";

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      bannerImage,
      author,
      shortDescription,
      content,
      tags,
    } = req.body;

    if (!title || !bannerImage || !author || !shortDescription || !content) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    // Check duplicate
    const exists = await Blog.findOne({ slug });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Blog with similar title exists" });
    }

    const blog = await Blog.create({
      title,
      subtitle,
      slug,
      bannerImage,
      author,
      shortDescription,
      content,
      tags,
    });

    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single Blog by Slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ success: true, message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
