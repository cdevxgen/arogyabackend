import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },

    shippingAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" },
    },

    additionalInfo: {
      notes: { type: String },
    },

    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        variantLabel: { type: String },
        flavorName: { type: String },
        quantity: { type: Number, required: true },
        pricePerUnit: { type: Number, required: true },
        image: { type: String },
      },
    ],

    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: "Cash on Delivery" },
    orderStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
