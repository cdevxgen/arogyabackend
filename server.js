import express from "express";
import { connectDB } from "./db/db.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import couponRouter from "./routes/coupon.router.js";
import authRouter from "./routes/auth.router.js";
import blogRouter from "./routes/blog.router.js";
import customerRoutes from "./routes/customer.router.js";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Enable CORS for both localhost and production frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local frontend
      "https://arogyaguru.vercel.app", // ✅ Production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

app.use("/api/auth", authRouter);

app.use("/api/customer", customerRoutes);

// API Routes
app.use("/api/v4/products", productRouter);
app.use("/api/v4/orders", orderRouter);
app.use("/api/v4/coupons", couponRouter);
app.use("/api/v4/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(8080, () => {
  console.log("server running 8080");
});
