// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // process.env se MONGO_URI string fetch hogi
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`🟢 Cloud Cluster Connected Mapped Hosted Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`🔴 MongoDB Connection Framework Fatal Error: ${error.message}`);
    process.exit(1); // Server instant execution kill handling logic
  }
};

module.exports = connectDB;