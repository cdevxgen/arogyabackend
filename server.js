import express from "express";
import cors from "cors";

import { connectDB } from "./db/db.js";

import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import couponRouter from "./routes/coupon.router.js";
import authRouter from "./routes/auth.router.js";
import blogRouter from "./routes/blog.router.js";
import customerRoutes from "./routes/customer.router.js";
import reviewRoutes from "./routes/review.router.js";
import paymentRoutes from "./routes/payment.router.js";
import quoteRoutes from "./routes/quoteRequest.router.js";

import soupsRoutes from "./routes/soups/soup.router.js";
import maltsRoutes from "./routes/soups/malt.router.js";
import programRoutes from "./routes/soups/program.router.js";
import bulkRequestRoutes from "./routes/bulkRequest.router.js";

// ✅ CREATE APP FIRST
const app = express();

// ✅ MIDDLEWARES
app.use(express.json());

// ✅ CORS CONFIG
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://arogyaguru.vercel.app",
      "https://arogyaguru.in",
      "https://www.arogyaguru.in",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ CONNECT DB
connectDB();

//payment razorpay
app.use("/api/payment", paymentRoutes);

// ✅ ROUTES (AFTER app IS DEFINED)
app.use("/api/auth", authRouter);

app.use("/api/customer", customerRoutes);
app.use("/api/v4/customers", customerRoutes);

app.use("/api/v4/proreviews", reviewRoutes);

app.use("/api/v4/products", productRouter);
app.use("/api/v4/orders", orderRouter);
app.use("/api/v4/coupons", couponRouter);
app.use("/api/v4/blogs", blogRouter);

app.use("/api/v4/quotes", quoteRoutes);

app.use("/api/v4/soupsdata", soupsRoutes);
app.use("/api/v4/maltsdata", maltsRoutes);
app.use("/api/v4/programdata", programRoutes);

app.use("/api/v4/bulkrequest", bulkRequestRoutes);

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ START SERVER
app.listen(8080, () => {
  console.log("🚀 Server running on port 8080");
});
