/* services/shiprocket.service.js */
import fetch from "node-fetch";

let shiprocketToken = null;
let tokenExpiry = null;

const SHIPROCKET_BASE_URL = "https://apiv2.shiprocket.in/v1/external";

/* ===============================
   🔐 GET / CACHE TOKEN
================================ */
export const getShiprocketToken = async () => {
  if (shiprocketToken && tokenExpiry > Date.now() + 10 * 60 * 1000) {
    return shiprocketToken;
  }

  console.log("🔐 Authenticating with Shiprocket...");
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
      console.error("❌ Auth Failed Response:", JSON.stringify(data));
      throw new Error(data.message || "Shiprocket auth failed");
    }

    shiprocketToken = data.token;
    tokenExpiry = Date.now() + 8 * 60 * 60 * 1000;
    console.log("✅ Shiprocket Token Acquired");

    return shiprocketToken;
  } catch (error) {
    console.error("❌ Shiprocket Auth Error:", error.message);
    throw error;
  }
};

/* ===============================
   🏢 GET VALID PICKUP LOCATION (DEBUG MODE)
================================ */
const getValidPickupLocation = async (token) => {
  // 1. Check ENV first
  if (process.env.SHIPROCKET_PICKUP_LOCATION) {
    console.log(
      "📍 Using Pickup Location from ENV:",
      process.env.SHIPROCKET_PICKUP_LOCATION
    );
    return process.env.SHIPROCKET_PICKUP_LOCATION;
  }

  // 2. Fetch from API
  console.log("🔄 Fetching Pickup Locations list from Shiprocket API...");
  try {
    const response = await fetch(
      `${SHIPROCKET_BASE_URL}/settings/pickup_locations`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();

    // --- DEBUG LOG START ---
    console.log(
      "🔍 Raw Pickup Locations Response:",
      JSON.stringify(data, null, 2)
    );
    // --- DEBUG LOG END ---

    const addresses = data?.data?.shipping_address || [];

    if (addresses.length > 0) {
      // Return the nickname of the first active address found
      const validLocation = addresses[0].pickup_location_nickname;
      console.log("✅ Auto-selected Pickup Location:", validLocation);
      return validLocation;
    }

    throw new Error(
      "No Pickup Locations found in Shiprocket account response."
    );
  } catch (error) {
    console.error("❌ Failed to fetch pickup locations:", error.message);
    // CRITICAL: Don't fallback to 'Primary' blindly if it caused errors before.
    // Instead, re-throw so we see the real issue in logs.
    throw new Error(
      "Could not determine a valid Pickup Location. Please check logs."
    );
  }
};

/* ===============================
   📦 CREATE SHIPROCKET ORDER
================================ */
export const createShiprocketOrder = async (order, dimensions = {}) => {
  console.log("📦 Starting Shiprocket Order Creation...");
  const token = await getShiprocketToken();

  // 1. GET LOCATION
  const pickupLocation = await getValidPickupLocation(token);

  // 2. FORMAT DATE
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 16).replace("T", " ");

  // 3. CLEAN DATA
  const phoneRaw = order.customerDetails?.phone || "";
  const cleanPhone = phoneRaw.toString().replace(/\D/g, "").slice(-10);
  const cleanPincode = parseInt(order.shippingAddress?.pincode || "000000", 10);

  // 4. DIMENSIONS
  const firstItem = (order.items && order.items[0]) || {};
  const length = parseFloat(dimensions.length || firstItem.length || 10);
  const breadth = parseFloat(dimensions.breadth || firstItem.breadth || 10);
  const height = parseFloat(dimensions.height || firstItem.height || 10);
  const weight = parseFloat(dimensions.weight || firstItem.weight || 0.5);

  const payload = {
    order_id: order._id.toString(),
    order_date: formattedDate,
    pickup_location: pickupLocation, // <--- THIS IS THE CRITICAL FIELD

    billing_customer_name: order.customerDetails?.firstName || "Customer",
    billing_last_name: order.customerDetails?.lastName || "",
    billing_address: order.shippingAddress?.addressLine1 || "Address",
    billing_address_2: order.shippingAddress?.addressLine2 || "",
    billing_city: order.shippingAddress?.city || "City",
    billing_pincode: cleanPincode,
    billing_state: order.shippingAddress?.state || "State",
    billing_country: "India",
    billing_email: order.customerDetails?.email || "email@example.com",
    billing_phone: cleanPhone,

    shipping_is_billing: true,

    order_items: order.items.map((item) => ({
      name: item.title,
      sku: item.sku || item.productId?.toString() || "SKU-DEF",
      units: parseInt(item.quantity || 1, 10),
      selling_price: parseFloat(item.pricePerUnit || 0),
      discount: 0,
      tax: 0,
    })),

    payment_method:
      order.paymentMethod === "Cash on Delivery" ? "COD" : "Prepaid",
    sub_total: parseFloat(order.subtotal || 0),
    length,
    breadth,
    height,
    weight,
  };

  console.log(
    "🚀 Payload being sent to Shiprocket:",
    JSON.stringify(payload, null, 2)
  );

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

    if (!response.ok || data.status_code === 422 || data.status_code === 400) {
      console.error(
        "❌ Shiprocket API Rejected Request:",
        JSON.stringify(data, null, 2)
      );
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
  const response = await fetch(
    `${SHIPROCKET_BASE_URL}/courier/track/shipment/${shipmentId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error("Tracking fetch failed");
  return data[shipmentId] || data.tracking_data || data;
};

/* ===============================
   🧮 CALCULATE SHIPPING RATE
================================ */
export const calculateShippingRate = async ({
  delivery_postcode,
  weight,
  cod = 0,
}) => {
  console.log(
    `🧮 Calculating shipping rate for pincode: ${delivery_postcode}, weight: ${weight}`
  );

  const token = await getShiprocketToken();
  const pickup_postcode = process.env.SHIPROCKET_PICKUP_PINCODE;

  if (!pickup_postcode) {
    console.error("❌ SHIPROCKET_PICKUP_PINCODE is missing in .env");
    throw new Error("Warehouse pickup pincode is not configured.");
  }

  // Construct query parameters
  const queryParams = new URLSearchParams({
    pickup_postcode,
    delivery_postcode,
    weight,
    cod,
  }).toString();

  try {
    const response = await fetch(
      `${SHIPROCKET_BASE_URL}/courier/serviceability/?${queryParams}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "❌ Shiprocket Serviceability Error:",
        JSON.stringify(data, null, 2)
      );
      throw new Error(
        data.message || "Failed to fetch shipping rates from Shiprocket"
      );
    }

    // Check if couriers are available
    if (
      data.status === 200 &&
      data.data &&
      data.data.available_courier_companies.length > 0
    ) {
      const couriers = data.data.available_courier_companies;

      // Sort to find the cheapest rate
      couriers.sort((a, b) => a.rate - b.rate);

      const lowestRate = couriers[0].rate;
      console.log(
        `✅ Lowest shipping rate found: ₹${lowestRate} via ${couriers[0].courier_name}`
      );

      return lowestRate;
    } else {
      throw new Error("No serviceable couriers found for this pincode.");
    }
  } catch (error) {
    console.error("❌ Calculate Shipping Rate Error:", error.message);
    throw error;
  }
};
