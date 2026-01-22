/* services/shiprocket.service.js */
import fetch from "node-fetch"; // Ensure node-fetch is installed or use native fetch in Node 18+

let shiprocketToken = null;
let tokenExpiry = null;

const SHIPROCKET_BASE_URL = "https://apiv2.shiprocket.in/v1/external";

/* ===============================
   🔐 GET / CACHE TOKEN
================================ */
export const getShiprocketToken = async () => {
  // Return cached token if valid (buffer of 10 mins)
  if (shiprocketToken && tokenExpiry > Date.now() + 10 * 60 * 1000) {
    return shiprocketToken;
  }

  try {
    const response = await fetch(`${SHIPROCKET_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Shiprocket auth failed");
    }

    shiprocketToken = data.token;
    // Token valid for 24 hours usually, but we refresh every 8 hours to be safe
    tokenExpiry = Date.now() + 8 * 60 * 60 * 1000;

    return shiprocketToken;
  } catch (error) {
    console.error("Shiprocket Auth Error:", error.message);
    throw error;
  }
};

/* ===============================
   📦 CREATE SHIPROCKET ORDER
================================ */
export const createShiprocketOrder = async (order, dimensions = {}) => {
  const token = await getShiprocketToken();

  // 1. FORMAT DATE: YYYY-MM-DD HH:mm
  // Note: Shiprocket is strict about this format.
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  // 2. DIMENSIONS (Priority: Override > Item Default > Fallback)
  // We use the first item's dimensions if no override is provided
  const firstItem = order.items[0] || {};

  const finalLength = parseFloat(dimensions.length || firstItem.length || 10);
  const finalBreadth = parseFloat(
    dimensions.breadth || firstItem.breadth || 10
  );
  const finalHeight = parseFloat(dimensions.height || firstItem.height || 10);
  const finalWeight = parseFloat(dimensions.weight || firstItem.weight || 0.5);

  // 3. SANITIZE DATA
  // Shiprocket fails if phone has spaces or pincode is a string
  const cleanPhone = order.customerDetails.phone.replace(/\D/g, "").slice(-10); // Last 10 digits
  const cleanPincode = parseInt(order.shippingAddress.pincode, 10);

  // 4. PICKUP LOCATION
  // Matches the "Pickup Location Nickname" in your Shiprocket Settings -> Pickup Addresses
  const pickupLocation = process.env.SHIPROCKET_PICKUP_LOCATION || "Primary";

  const payload = {
    order_id: order._id.toString(),
    order_date: formattedDate,
    pickup_location: pickupLocation,

    // Billing Details
    billing_customer_name: order.customerDetails.firstName,
    billing_last_name: order.customerDetails.lastName || "",
    billing_address: order.shippingAddress.addressLine1,
    billing_address_2: order.shippingAddress.addressLine2 || "",
    billing_city: order.shippingAddress.city,
    billing_pincode: cleanPincode, // Must be Integer
    billing_state: order.shippingAddress.state,
    billing_country: "India",
    billing_email: order.customerDetails.email,
    billing_phone: cleanPhone,

    // Shipping Details (Usually same as billing for e-commerce)
    shipping_is_billing: true,

    // Order Items
    order_items: order.items.map((item) => ({
      name: item.title,
      sku: item.sku || item.productId.toString(),
      units: parseInt(item.quantity || item.units, 10),
      selling_price: parseFloat(item.pricePerUnit),
      discount: parseFloat(item.discount || 0),
      tax: parseFloat(item.tax || 0),
    })),

    // Payment Details
    payment_method:
      order.paymentMethod === "Cash on Delivery" ? "COD" : "Prepaid",
    shipping_charges: 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: parseFloat(order.discountAmount || 0),
    sub_total: parseFloat(order.subtotal),

    // Package Dimensions
    length: finalLength,
    breadth: finalBreadth,
    height: finalHeight,
    weight: finalWeight,
  };

  try {
    const response = await fetch(`${SHIPROCKET_BASE_URL}/orders/create/adhoc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // Check for specific API errors (400 Bad Request / 422 Unprocessable Entity)
    if (!response.ok || data.status_code === 422 || data.status_code === 400) {
      console.error(
        "❌ Shiprocket Payload Failed:",
        JSON.stringify(payload, null, 2)
      );
      console.error(
        "❌ Shiprocket Response Error:",
        JSON.stringify(data, null, 2)
      );

      // Extract specific error message if available
      const msg =
        data.message ||
        (data.errors ? JSON.stringify(data.errors) : "Shiprocket API Error");
      throw new Error(msg);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/* ===============================
   🚚 TRACK ORDER
================================ */
export const trackShiprocketOrder = async (shipmentId) => {
  const token = await getShiprocketToken();

  try {
    const response = await fetch(
      `${SHIPROCKET_BASE_URL}/courier/track/shipment/${shipmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch tracking details");
    }

    // Shiprocket tracking response structure varies; usually data[shipmentId] or data.tracking_data
    return data[shipmentId] || data.tracking_data || data;
  } catch (error) {
    console.error("Tracking Error:", error.message);
    throw error;
  }
};
