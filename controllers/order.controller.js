import Order from "../models/order.model.js";
import Coupon from "../models/coupon.model.js";

// CREATE NEW ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      customerDetails,
      shippingAddress,
      additionalInfo,
      items,

      // Financials
      subtotal,
      discountAmount,
      totalAmount,

      // Coupon
      couponCode,

      // Payment
      paymentMethod,
      paymentStatus,
      transactionId,

      orderStatus,
    } = req.body;

    // Validate required fields
    if (
      !customerDetails ||
      !shippingAddress ||
      !items ||
      items.length === 0 ||
      !subtotal ||
      !totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // If coupon is applied, update usage count
    if (couponCode) {
      await Coupon.findOneAndUpdate(
        { code: couponCode.toUpperCase() },
        { $inc: { usedCount: 1 } },
        { new: true }
      );
    }

    // Create order object
    const newOrder = new Order({
      customerDetails,
      shippingAddress,
      additionalInfo,
      items,

      subtotal,
      discountAmount,
      totalAmount,

      couponCode: couponCode || null,

      paymentMethod,
      paymentStatus,
      transactionId,

      orderStatus: orderStatus || "Pending",
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      orderId: newOrder._id,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
