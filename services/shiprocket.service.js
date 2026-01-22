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
export const createShiprocketOrder = async (order) => {
  const token = await getShiprocketToken();

  const payload = {
    order_id: order._id.toString(),
    order_date: new Date().toISOString(),
    pickup_location: "Primary",

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
  };

  const response = await fetch(`${SHIPROCKET_BASE_URL}/orders/create/adhoc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Shiprocket order failed");
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
