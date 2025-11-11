import express from "express";
import { connectDB } from "./db/db.js";
import productRouter from "./routes/product.router.js";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Enable CORS for both localhost and production frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local frontend
      "https://arogyabackend.vercel.app", // ✅ Production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDB();

// API Routes
app.use("/api/v4/products", productRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(8080, () => {
  console.log("server running 8080");
});
