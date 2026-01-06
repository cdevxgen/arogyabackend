import QuoteRequest from "../models/quoteRequest.model.js";

/**
 * CREATE QUOTE REQUEST (Public)
 * POST /api/v4/quotes
 */
export const createQuoteRequest = async (req, res) => {
  try {
    const {
      name,
      companyName,
      email,
      phone,
      location,
      locationUrl, // Added this
      eventDate,
      guestCount,
      productInterest, // Backend expects this
      category, // Frontend sends this
    } = req.body;

    // --- MAPPING LOGIC ---
    // If frontend sends 'category', map it to 'productInterest'
    let finalProductInterest = productInterest;

    if (!finalProductInterest && category) {
      finalProductInterest = {
        id: category.value,
        name: category.label,
        type: category.type || "soup", // Fallback if type is missing
      };
    }

    // --- VALIDATION ---
    if (
      !name ||
      !email ||
      !phone ||
      !location ||
      !eventDate ||
      !guestCount ||
      !finalProductInterest?.id ||
      !finalProductInterest?.name
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
        debug: { receivedInterest: finalProductInterest }, // Helpful for debugging
      });
    }

    // --- CREATE ---
    const quote = await QuoteRequest.create({
      name,
      companyName,
      email,
      phone,
      location,
      locationUrl, // Save the URL
      eventDate,
      guestCount,
      productInterest: finalProductInterest,
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
      error: error.message,
    });
  }
};

// ... (Rest of your controller functions remain the same)
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
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSingleQuoteRequest = async (req, res) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id);
    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: "Quote not found" });
    }
    return res.status(200).json({ success: true, data: quote });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateQuoteStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["new", "contacted", "confirmed", "cancelled"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }
    const quote = await QuoteRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: "Quote not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Status updated", data: quote });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteQuoteRequest = async (req, res) => {
  try {
    const quote = await QuoteRequest.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: "Quote not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
