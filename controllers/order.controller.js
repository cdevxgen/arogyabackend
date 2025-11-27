import Order from "../models/order.model.js";

// CREATE NEW ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      customerDetails,
      shippingAddress,
      additionalInfo,
      items,
      totalAmount,
      paymentMethod,
      orderStatus,
    } = req.body;

    if (
      !customerDetails ||
      !shippingAddress ||
      !items ||
      items.length === 0 ||
      !totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const newOrder = new Order({
      customerDetails,
      shippingAddress,
      additionalInfo,
      items,
      totalAmount,
      paymentMethod,
      orderStatus,
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
