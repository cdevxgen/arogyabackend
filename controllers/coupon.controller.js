import Coupon from "../models/coupon.model.js";

// CREATE COUPON
export const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minimumOrderValue,
      expiryDate,
      usageLimit,
    } = req.body;

    if (!code || !discountType || !discountValue || !expiryDate) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Coupon code already exists",
      });
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minimumOrderValue,
      expiryDate,
      usageLimit,
    });

    await coupon.save();

    res.status(201).json({
      success: true,
      message: "Coupon created successfully!",
      coupon,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL COUPONS
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json(coupons);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE COUPON
export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      coupon,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE COUPON
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({ success: true, message: "Coupon deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// APPLY COUPON (API used at Checkout)
export const applyCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    // expired?
    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Coupon expired",
      });
    }

    // active?
    if (!coupon.isActive) {
      return res.status(400).json({
        success: false,
        message: "Coupon is disabled",
      });
    }

    // usage limit?
    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({
        success: false,
        message: "Coupon usage limit reached",
      });
    }

    // check minimum order
    if (cartTotal < coupon.minimumOrderValue) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value is ₹${coupon.minimumOrderValue}`,
      });
    }

    // calculate discount
    let discountAmount = 0;

    if (coupon.discountType === "percentage") {
      discountAmount = (coupon.discountValue / 100) * cartTotal;
    } else {
      discountAmount = coupon.discountValue;
    }

    const finalAmount = Math.max(cartTotal - discountAmount, 0);

    // ⭐ RETURN FULL DATA (needed for frontend)
    res.status(200).json({
      success: true,
      message: "Coupon applied successfully",

      // 🔥 Required by frontend
      code: coupon.code,
      discountValue: coupon.discountValue,
      discountType: coupon.discountType,
      minimumOrderValue: coupon.minimumOrderValue,
      _id: coupon._id,

      // Calculated values
      discountAmount: Math.round(discountAmount),
      finalAmount: Math.round(finalAmount),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
