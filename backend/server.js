// =====================================================
// KICKSTORE BACKEND SERVER
// =====================================================

const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const cors = require("cors");
require("dotenv").config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Initialize Express app
const app = express();

// =====================================================
// MIDDLEWARE (Code that runs before route handlers)
// =====================================================

// Allow frontend to communicate with this backend
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// =====================================================
// ROUTES (API endpoints)
// =====================================================

// Test endpoint - lets you know server is running
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is running!" });
});

// Product routes
const Product = require("./models/Product");

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ id: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Search products with optional category filter
app.get("/api/products/search", async (req, res) => {
  try {
    const q = req.query.q || "";
    const category = req.query.category;

    const filter = { name: { $regex: q, $options: "i" } };
    if (category && category !== "All") filter.category = category;

    const results = await Product.find(filter).sort({ id: 1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
