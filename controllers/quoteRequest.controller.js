import QuoteRequest from "../models/quoteRequest.model.js";

/**
 * CREATE QUOTE REQUEST
 * POST /api/v1/quotes
 */
export const createQuoteRequest = async (req, res) => {
  try {
    const {
      name,
      companyName,
      email,
      phone,
      location,
      eventDate,
      guestCount,
      category,
    } = req.body;

    // Basic validation
    if (!name || !email || !phone || !location || !eventDate || !guestCount) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const quote = await QuoteRequest.create({
      name,
      companyName,
      email,
      phone,
      location,
      eventDate,
      guestCount,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Quote request submitted successfully",
      data: quote,
    });
  } catch (error) {
    console.error("Create Quote Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating quote request",
    });
  }
};

/**
 * GET ALL QUOTE REQUESTS (Admin)
 * GET /api/v1/quotes
 */
export const getAllQuoteRequests = async (req, res) => {
  try {
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes,
    });
  } catch (error) {
    console.error("Get Quotes Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * GET SINGLE QUOTE REQUEST
 * GET /api/v1/quotes/:id
 */
export const getSingleQuoteRequest = async (req, res) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote request not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    console.error("Get Single Quote Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * UPDATE QUOTE STATUS (Admin)
 * PATCH /api/v1/quotes/:id
 */
export const updateQuoteStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const quote = await QuoteRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: quote,
    });
  } catch (error) {
    console.error("Update Quote Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * DELETE QUOTE REQUEST (Admin)
 * DELETE /api/v1/quotes/:id
 */
export const deleteQuoteRequest = async (req, res) => {
  try {
    const quote = await QuoteRequest.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quote request deleted successfully",
    });
  } catch (error) {
    console.error("Delete Quote Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
