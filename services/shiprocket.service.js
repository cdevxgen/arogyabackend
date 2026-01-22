import fetch from "node-fetch"; // Ensure you have this or use native fetch in Node 18+

let shiprocketToken = null;
let tokenExpiry = null;

const SHIPROCKET_BASE_URL = "https://apiv2.shiprocket.in/v1/external";

/* ===============================
   🔐 GET / CACHE TOKEN
================================ */
export const getShiprocketToken = async () => {
  if (shiprocketToken && tokenExpiry > Date.now()) {
    return shiprocketToken;
  }

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
  tokenExpiry = Date.now() + 8 * 60 * 60 * 1000; // 8 hours

  return shiprocketToken;
};

/* ===============================
   📦 CREATE SHIPROCKET ORDER
================================ */
export const createShiprocketOrder = async (order, dimensions = {}) => {
  const token = await getShiprocketToken();

  // Format Date: YYYY-MM-DD HH:mm
  const date = new Date();
  const formattedDate =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    " " +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2);

  // 1. USE DYNAMIC DIMENSIONS OR FALLBACK
  const finalLength = parseFloat(dimensions.length) || 10;
  const finalBreadth = parseFloat(dimensions.breadth) || 10;
  const finalHeight = parseFloat(dimensions.height) || 10;
  const finalWeight = parseFloat(dimensions.weight) || 0.5;

  // ⚠️ CRITICAL: CHECK YOUR SHIPROCKET DASHBOARD FOR EXACT PICKUP LOCATION NAME
  const PICKUP_LOCATION_NAME = "Primary";

  const payload = {
    order_id: order._id.toString(),
    order_date: formattedDate,
    pickup_location: PICKUP_LOCATION_NAME,

    billing_customer_name: order.customerDetails.firstName,
    billing_last_name: order.customerDetails.lastName || "",
    billing_email: order.customerDetails.email,
    billing_phone: order.customerDetails.phone,
    billing_address: order.shippingAddress.addressLine1,
    billing_address_2: order.shippingAddress.addressLine2 || "",
    billing_city: order.shippingAddress.city,
    billing_state: order.shippingAddress.state,
    billing_pincode: order.shippingAddress.pincode,
    billing_country: "India",

    shipping_is_billing: true,

    order_items: order.items.map((item) => ({
      name: item.title,
      sku: item.productId ? item.productId.toString() : "SKU-DEFAULT",
      units: parseInt(item.quantity),
      selling_price: parseFloat(item.pricePerUnit),
    })),

    payment_method:
      order.paymentMethod === "Cash on Delivery" ? "COD" : "Prepaid",
    sub_total: parseFloat(order.subtotal),

    length: finalLength,
    breadth: finalBreadth,
    height: finalHeight,
    weight: finalWeight,
  };

  console.log(
    "🚀 Sending Payload to Shiprocket:",
    JSON.stringify(payload, null, 2)
  );

  const response = await fetch(`${SHIPROCKET_BASE_URL}/orders/create/adhoc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  // 3. IMPROVED ERROR HANDLING
  if (!response.ok || data.status_code === 422 || data.status_code === 400) {
    console.error(
      "❌ Shiprocket Error Response:",
      JSON.stringify(data, null, 2)
    );

    let errorMessage = data.message || "Shiprocket API Error";
    if (data.errors) {
      errorMessage += " : " + JSON.stringify(data.errors);
    }
    throw new Error(errorMessage);
  }

  return data;
};

export const trackShiprocketOrder = async (shipmentId) => {
  const token = await getShiprocketToken();

  const response = await fetch(
    `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch tracking details");
  }

  return data;
};
