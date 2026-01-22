import Order from "../models/order.model.js";
import Coupon from "../models/coupon.model.js";
import {
  createShiprocketOrder,
  trackShiprocketOrder,
} from "../services/shiprocket.service.js";

/* ======================================================
   🛒 CREATE NEW ORDER
   (Customer only)
====================================================== */
export const createOrder = async (req, res) => {
  try {
    // Prefer JWT user, fallback to body (guest checkout if allowed)
    const customerId = req.user?.id || req.body.customerId;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Customer authentication required",
      });
    }

    const {
      customerDetails,
      shippingAddress,
      additionalInfo,
      items,

      subtotal,
      discountAmount = 0,
      totalAmount,

      couponCode,

      paymentMethod = "Cash on Delivery",
      paymentStatus = "Pending",
      transactionId = null,
      paymentGateway = null,
    } = req.body;

    // Basic validation
    if (
      !customerDetails ||
      !shippingAddress ||
      !items ||
      items.length === 0 ||
      subtotal == null ||
      totalAmount == null
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    /* ===============================
       🎟 COUPON VALIDATION
    =============================== */
    let appliedCoupon = null;

    if (couponCode) {
      appliedCoupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        expiryDate: { $gte: new Date() },
        $expr: { $lt: ["$usedCount", "$usageLimit"] },
      });

      if (!appliedCoupon) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired coupon",
        });
      }
    }

    /* ===============================
       📦 CREATE ORDER
    =============================== */
    const order = new Order({
      customerId,
      customerDetails,
      shippingAddress,
      additionalInfo,
      items,

      subtotal,
      discountAmount,
      totalAmount,

      couponCode: appliedCoupon ? appliedCoupon.code : null,
      couponId: appliedCoupon ? appliedCoupon._id : null,

      paymentMethod,
      paymentStatus,
      transactionId,
      paymentGateway,

      orderStatus: "Pending",
    });

    await order.save();

    // Increment coupon usage ONLY after successful order
    if (appliedCoupon) {
      appliedCoupon.usedCount += 1;
      await appliedCoupon.save();
    }

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ======================================================
   📄 GET ALL ORDERS
   (Admin)
====================================================== */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("customerId", "name email")
      .populate("couponId", "code discountType discountValue");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    console.error("Fetch orders error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ======================================================
   👤 GET ORDERS BY CUSTOMER (My Orders)
   (Customer)
====================================================== */
export const getOrdersByCustomer = async (req, res) => {
  try {
    const customerId = req.user?.id;

    const orders = await Order.find({ customerId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    console.error("Customer orders error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ======================================================
   📦 GET ORDER BY ID
   (Admin / Owner)
====================================================== */
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

    return res.status(200).json({
      success: true,
      order, // frontend already normalizes this
    });
  } catch (err) {
    console.error("Get order error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ======================================================
   🔍 TRACK ORDERS (Public + Logged-in)
   Supports:
   - phone
   - email
   - phone + email (best match)
====================================================== */
export const trackOrder = async (req, res) => {
  try {
    const { phone, email } = req.query;

    if (!phone && !email) {
      return res.status(400).json({
        success: false,
        message: "Phone number or email is required",
      });
    }

    const query = {};

    if (phone) {
      query["customerDetails.phone"] = phone;
    }

    if (email) {
      query["customerDetails.email"] = email.toLowerCase();
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    console.error("Track order error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ======================================================
   ✏️ UPDATE ORDER
   (Admin)
====================================================== */
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (err) {
    console.error("Update order error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ======================================================
   ❌ DELETE ORDER
   (Admin)
====================================================== */
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err) {
    console.error("Delete order error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ======================================================
   🗑 DELETE MULTIPLE ORDERS
   (Admin)
====================================================== */
export const deleteMultipleOrders = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order IDs array required",
      });
    }

    const result = await Order.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} orders deleted`,
    });
  } catch (err) {
    console.error("Bulk delete error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ======================================================
   🚚 SHIP ORDER (ADMIN ONLY)
====================================================== */
/* ======================================================
   🚚 SHIP ORDER (ADMIN ONLY)
====================================================== */
export const shipOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. EXTRACT DIMENSIONS FROM REQUEST BODY
    const { length, breadth, height, weight } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Prevent double shipping
    if (order.tracking?.shipmentId) {
      return res.status(400).json({
        success: false,
        message: "Order already shipped",
      });
    }

    // Optional: You might want to allow shipping if it's not confirmed yet by auto-confirming here
    // But strictly following your logic:
    if (order.orderStatus !== "Confirmed") {
      return res.status(400).json({
        success: false,
        message: "Order must be confirmed before shipping",
      });
    }

    // 2. PASS DIMENSIONS TO SERVICE
    // We pass 'req.body' as the second argument
    const sr = await createShiprocketOrder(order, {
      length,
      breadth,
      height,
      weight,
    });

    if (!sr?.shipment_id) {
      // If SR fails, we throw the error message returned by the service
      throw new Error(
        sr?.message ||
          JSON.stringify(sr?.errors) ||
          "Invalid Shiprocket response"
      );
    }

    // Save tracking info
    order.tracking = {
      shipmentId: sr.shipment_id,
      awbCode: sr.awb_code || null,
      courierName: sr.courier_name || null,
      status: "Shipped",
    };

    order.orderStatus = "Shipped";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order shipped successfully",
      tracking: {
        shipmentId: order.tracking.shipmentId,
        awbCode: order.tracking.awbCode,
        courierName: order.tracking.courierName,
      },
    });
  } catch (err) {
    console.error("Ship order error:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message || "Shipping failed",
    });
  }
};

/* ======================================================
   📦 TRACK ORDER BY ORDER NUMBER (PUBLIC)
====================================================== */
export const trackOrderByNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findById(orderNumber);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // If not shipped yet
    if (!order.tracking?.shipmentId) {
      return res.status(200).json({
        success: true,
        orderStatus: order.orderStatus,
        message: "Order is not shipped yet",
      });
    }

    // Fetch live tracking from Shiprocket
    const trackingData = await trackShiprocketOrder(order.tracking.shipmentId);

    // Optional: save latest tracking snapshot
    order.tracking.status = trackingData.current_status;
    order.tracking.history = trackingData.shipment_track_activities || [];
    await order.save();

    return res.status(200).json({
      success: true,
      orderId: order._id,
      orderStatus: order.orderStatus,
      tracking: {
        courier: trackingData.courier_name,
        awb: trackingData.awb_code,
        currentStatus: trackingData.current_status,
        history: trackingData.shipment_track_activities,
      },
    });
  } catch (err) {
    console.error("Tracking error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch tracking details",
    });
  }
};
