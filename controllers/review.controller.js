import Review from "../models/review.model.js";

/**
 * CREATE REVIEW (Customer)
 * POST /api/v4/proreviews
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
 * GET APPROVED REVIEWS (Public)
 * GET /api/v4/proreviews/:productId
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

/**
 * GET MY REVIEW FOR PRODUCT (Customer)
 * GET /api/v4/proreviews/my/:productId
 */
export const getMyReview = async (req, res) => {
  const review = await Review.findOne({
    productId: req.params.productId,
    customerId: req.customer._id,
  });

  res.json(review);
};
