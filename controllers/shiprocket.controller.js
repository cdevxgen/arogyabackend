import Order from "../models/order.model.js"; // Ensure Order model is imported

import { calculateShippingRate } from "../services/shiprocket.service.js";

export const calculateShipping = async (req, res) => {
  try {
    const { delivery_postcode, weight, cod } = req.body;

    if (!delivery_postcode) {
      return res
        .status(400)
        .json({ success: false, message: "Pincode is required" });
    }

    // Call the service we just created
    const rate = await calculateShippingRate({
      delivery_postcode,
      weight: weight || 0.5, // Default to 0.5kg if not provided
      cod: cod ? 1 : 0,
    });

    return res.status(200).json({
      success: true,
      shippingCost: Math.round(rate), // Rounding to avoid decimals in UI
    });
  } catch (error) {
    console.error("Controller Calculate Shipping Error:", error.message);

    // IMPORTANT FALLBACK: If API fails, don't block the user from checking out!
    // Send a default fallback shipping cost.
    return res.status(200).json({
      success: true,
      shippingCost: 50, // Default flat rate fallback
      message: "Used fallback shipping rate",
    });
  }
};

/* ======================================================
   🔔 SHIPROCKET WEBHOOK LISTENER (Auto-Updates DB)
====================================================== */
export const shiprocketWebhook = async (req, res) => {
  try {
    const trackingData = req.body;

    // 1. Validate payload
    if (!trackingData || !trackingData.awb) {
      // Always return 200 to webhooks so they don't keep retrying
      return res.status(200).send("No AWB in payload");
    }

    const awbCode = trackingData.awb;
    const currentStatus = trackingData.current_status?.toUpperCase() || "";

    // 2. Find the matching order in your database
    const order = await Order.findOne({ "tracking.awbCode": awbCode });
    if (!order) {
      return res.status(200).send("Order not found, but acknowledged");
    }

    // 3. Map Shiprocket's status to your internal Order Status
    let newInternalStatus = order.orderStatus;

    if (currentStatus === "DELIVERED") {
      newInternalStatus = "Delivered";
    } else if (
      currentStatus.includes("RTO") ||
      currentStatus.includes("RETURN")
    ) {
      newInternalStatus = "Returned";
    } else if (currentStatus === "CANCELED") {
      newInternalStatus = "Cancelled";
    } else if (
      ["PICKED UP", "IN TRANSIT", "OUT FOR DELIVERY", "SHIPPED"].includes(
        currentStatus
      )
    ) {
      // Don't downgrade a delivered order if a delayed webhook arrives
      if (
        order.orderStatus !== "Delivered" &&
        order.orderStatus !== "Returned"
      ) {
        newInternalStatus = "Shipped";
      }
    }

    // 4. Update and Save
    order.orderStatus = newInternalStatus;
    order.tracking.status = currentStatus;

    // Update tracking history if scans are provided in the webhook
    if (trackingData.scans && trackingData.scans.length > 0) {
      order.tracking.history = trackingData.scans;
    }

    await order.save();
    console.log(
      `✅ Webhook updated Order ${order._id} to ${newInternalStatus}`
    );

    return res.status(200).send("Webhook processed successfully");
  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    return res.status(200).send("Error processed gracefully");
  }
};
