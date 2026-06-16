// Seed script - imports products from data.js and inserts into MongoDB
const mongoose = require('mongoose');
const dns = require('dns');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

dns.setServers(['8.8.8.8', '8.8.4.4']);
const Product = require('./models/Product');
const products = require('../data.js');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert products
    await Product.insertMany(products);
    console.log(`🌱 Inserted ${products.length} products`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
