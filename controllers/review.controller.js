import Review from "../models/review.model.js";

/* ================= CUSTOMER ================= */

/**
 * CREATE REVIEW
 */
export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!rating || !comment)
      return res.status(400).json({ message: "Rating and comment required" });

    const review = await Review.create({
      productId,
      rating,
      comment,
      customerId: req.customer._id,
      customerName: req.customer.name || "Verified Customer",
    });

    res.status(201).json({
      message: "Review submitted and pending approval",
      review,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You already reviewed this product" });
    }

    res.status(500).json({ message: error.message });
  }
};

/**
 * GET MY REVIEW
 */
export const getMyReview = async (req, res) => {
  const review = await Review.findOne({
    productId: req.params.productId,
    customerId: req.customer._id,
  });

  res.json(review);
};

/**
 * DELETE MY REVIEW
 */
export const deleteMyReview = async (req, res) => {
  const review = await Review.findOneAndDelete({
    _id: req.params.reviewId,
    customerId: req.customer._id,
  });

  if (!review) return res.status(404).json({ message: "Review not found" });

  res.json({ message: "Your review deleted successfully" });
};

/* ================= PUBLIC ================= */

/**
 * GET APPROVED REVIEWS
 */
export const getApprovedReviews = async (req, res) => {
  const reviews = await Review.find({
    productId: req.params.productId,
    status: "approved",
  })
    .sort({ createdAt: -1 })
    .select("rating comment customerName createdAt");

  res.json(reviews);
};

/* ================= ADMIN ================= */

/**
 * GET ALL REVIEWS
 */
export const getAllReviews = async (req, res) => {
  const { status } = req.query;

  const filter = status ? { status } : {};

  const reviews = await Review.find(filter)
    .populate("customerId", "name email")
    .populate("productId", "name")
    .sort({ createdAt: -1 });

  res.json(reviews);
};

/**
 * GET REVIEW BY ID
 */
export const getReviewById = async (req, res) => {
  const review = await Review.findById(req.params.id)
    .populate("customerId", "name email")
    .populate("productId", "name");

  if (!review) return res.status(404).json({ message: "Review not found" });

  res.json(review);
};

/**
 * APPROVE REVIEW
 */
export const approveReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // ✅ FIX: Update 'status', not 'isApproved'
    review.status = "approved";

    const updatedReview = await review.save();

    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};

export const rejectReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // ✅ FIX: Update 'status' to 'rejected' (or 'pending' if you just want to hide it)
    review.status = "rejected";

    const updatedReview = await review.save();

    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE REVIEW (ADMIN)
 */
export const deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) return res.status(404).json({ message: "Review not found" });

  res.json({ message: "Review deleted successfully" });
};
