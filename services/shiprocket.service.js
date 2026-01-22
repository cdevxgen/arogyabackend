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
/* services/shiprocket.service.js */
export const createShiprocketOrder = async (order) => {
  const token = await getShiprocketToken();

  // SHIPROCKET REQUIRES DATE AS "YYYY-MM-DD HH:mm"
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

  const payload = {
    order_id: order._id.toString(),
    order_date: formattedDate, // FIX 1: Correct Date Format
    pickup_location: "Primary",

    // ... (Billing details remain the same) ...
    billing_customer_name: order.customerDetails.firstName,
    billing_last_name: order.customerDetails.lastName,
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
      sku: item.productId.toString(),
      units: item.quantity,
      selling_price: item.pricePerUnit,
    })),

    payment_method:
      order.paymentMethod === "Cash on Delivery" ? "COD" : "Prepaid",
    sub_total: order.subtotal,

    // FIX 2: MANDATORY FIELDS ADDED (Defaults if missing in DB)
    length: 10,
    breadth: 10,
    height: 10,
    weight: 0.5,
  };

  // ... rest of the fetch call
  const response = await fetch(`${SHIPROCKET_BASE_URL}/orders/create/adhoc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  // ...
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
