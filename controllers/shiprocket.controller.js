// src/controllers/shiprocket.controller.js
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
