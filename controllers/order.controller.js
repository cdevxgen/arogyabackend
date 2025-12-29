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

// TRACK ORDERS BY PHONE (RETURN MULTIPLE)
export const trackOrder = async (req, res) => {
  try {
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const orders = await Order.find({
      "customerDetails.phone": phone,
    }).sort({ createdAt: -1 }); // Newest first

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this phone number",
      });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    console.error("Tracking error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET ORDER BY ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ⭐ UPDATE ORDER (EDIT ORDER DETAILS + TRACKING NUMBER)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Order.findByIdAndUpdate(
      id,
      { $set: req.body }, // update any field dynamically
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updated,
    });
  } catch (err) {
    console.error("Error updating order:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// DELETE ORDER BY ID
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      deletedOrder: deleted,
    });
  } catch (err) {
    console.error("Error deleting order:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// DELETE MULTIPLE ORDERS
export const deleteMultipleOrders = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order IDs array is required",
      });
    }

    const result = await Order.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} orders deleted successfully`,
    });
  } catch (err) {
    console.error("Bulk delete error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
