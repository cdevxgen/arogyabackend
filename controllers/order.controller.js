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
      // Default to "Prepaid" if not specified, matching frontend logic
      paymentMethod = "Prepaid",
      paymentStatus = "Pending",
      transactionId = null,
      paymentGateway = null,
      order_date, // Receive specific date from frontend if sent
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
    // Map items to ensure Shiprocket fields are present
    // Fallback defaults are handled here just in case frontend misses them
    const formattedItems = items.map((item) => ({
      ...item,
      // Ensure numeric types for Shiprocket
      quantity: parseInt(item.quantity || item.amount, 10),
      units: parseInt(item.quantity || item.amount || item.units, 10),
      pricePerUnit: parseFloat(item.pricePerUnit),
      selling_price: parseFloat(item.selling_price || item.pricePerUnit),
      sku: item.sku || item.productId,
      // Default dimensions if missing
      length: item.length || 10,
      breadth: item.breadth || 10,
      height: item.height || 10,
      weight: item.weight || 0.5,
    }));

    const order = new Order({
      customerId,
      customerDetails: {
        ...customerDetails,
        // Ensure name exists for logistics
        name:
          customerDetails.name ||
          `${customerDetails.firstName} ${customerDetails.lastName}`,
      },
      shippingAddress: {
        ...shippingAddress,
        // Ensure pincode is a number
        pincode: parseInt(shippingAddress.pincode, 10),
        name:
          shippingAddress.name ||
          `${customerDetails.firstName} ${customerDetails.lastName}`,
        phone: shippingAddress.phone || customerDetails.phone,
      },
      additionalInfo: {
        ...additionalInfo,
        shiprocketOrderDate: order_date, // Store the formatted date string if provided
      },
      items: formattedItems,

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
      message: err.message || "Server error",
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
      order,
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
export const shipOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. EXTRACT DIMENSIONS
    // If the frontend sends empty body {}, these will be undefined.
    // The service layer should handle defaults, or the Order model defaults apply.
    const { length, breadth, height, weight } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Prevent double shipping
    if (order.tracking?.shipmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Order already shipped" });
    }

    // 2. FIX RACE CONDITION: Auto-confirm strictly in backend
    if (order.orderStatus !== "Confirmed") {
      console.log(`Auto-confirming order ${id} before shipping`);
      order.orderStatus = "Confirmed";
      await order.save();
    }

    // 3. CALL SHIPROCKET SERVICE
    // We pass the dimensions overrides if they exist in req.body,
    // otherwise the service will use order items' defaults.
    const sr = await createShiprocketOrder(order, {
      length,
      breadth,
      height,
      weight,
    });

    if (!sr?.shipment_id) {
      throw new Error(sr?.message || "Invalid Shiprocket response");
    }

    // 4. SAVE TRACKING INFO
    order.tracking = {
      shipmentId: sr.shipment_id,
      awbCode: sr.awb_code || null,
      courierName: sr.courier_name || null,
      status: "Shipped",
      orderId: sr.order_id, // Store Shiprocket's internal order ID
    };

    order.orderStatus = "Shipped";
    // Sync Legacy Fields for backwards compatibility
    order.trackingNumber = sr.awb_code || "";
    order.courierPartner = sr.courier_name || "";

    await order.save();

    // 5. RETURN SUCCESS
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
    // Return specific error message to frontend
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

    // Update latest tracking snapshot in DB
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
