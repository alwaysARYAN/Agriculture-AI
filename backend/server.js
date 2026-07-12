// backend/server.js
require('dotenv').config(); // Secure parameters sandbox loading Layer
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { parseSheetFromUrl } = require('./utils/sheetParser'); // Phase 2 Ingestion Engine Utility

// Main Application Runtime Initialization
const app = express();

// Global Structural Middlewares
app.use(cors()); // Allow distributed incoming request calls from Flutter client
app.use(express.json()); // Inbound payload conversion middleware (Body Parser)

// Execute Cloud DB Connection Engine Layer (Amol's Configuration)
connectDB();

// =========================================================================
// 🌾 GOOGLE SHEETS LIVE API ENGINE HANDLES (Aryan's System Integration)
// =========================================================================

// Root Verification Route Indicator
app.get('/', (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Agri-AI Node.js Backend Base Execution Terminal Running Smoothly!",
    timestamp: new Date()
  });
});

// 📉 Route 1: Live Mandi Bhav Indices Channel
app.get('/api/mandi/prices', async (req, res) => {
  try {
    const data = await parseSheetFromUrl(process.env.MANDI_SHEET_URL);
    res.status(200).json({ status: "Success", results: data.length, data });
  } catch (err) {
    res.status(500).json({ status: "Error", message: "Failed to fetch Mandi updates", error: err.message });
  }
});

// 🚜 Route 2: Sarkari Yojana Policy Distribution Node
app.get('/api/agri/schemes', async (req, res) => {
  try {
    const data = await parseSheetFromUrl(process.env.SCHEMES_SHEET_URL);
    res.status(200).json({ status: "Success", results: data.length, data });
  } catch (err) {
    res.status(500).json({ status: "Error", message: "Failed to fetch Yojana registry", error: err.message });
  }
});

// 🐛 Route 3: Crop Disease Treatments Dictionary (For Vision Cross-Mapping)
app.get('/api/agri/disease-guide', async (req, res) => {
  try {
    const data = await parseSheetFromUrl(process.env.DISEASE_SHEET_URL);
    res.status(200).json({ status: "Success", results: data.length, data });
  } catch (err) {
    res.status(500).json({ status: "Error", message: "Failed to fetch Disease knowledge guide", error: err.message });
  }
});

// 🌐 Route 4: App UI Localization Translation Streaming Matrix
app.get('/api/agri/uitext', async (req, res) => {
  try {
    const data = await parseSheetFromUrl(process.env.UI_SHEET_URL);
    res.status(200).json({ status: "Success", results: data.length, data });
  } catch (err) {
    res.status(500).json({ status: "Error", message: "Failed to stream Localization dictionaries", error: err.message });
  }
});


// =========================================================================
// ENGINE INITIALIZATION ERROR CATCHING MIDDLEWARES
// =========================================================================

// Global Route Not Found Handles (HTTP 404 Catch)
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "Requested REST API Node endpoint registry does not exist!"
  });
});

// Global Server Exception Trap
app.use((err, req, res, next) => {
  console.error(`🔴 App Exception Crash Catch: ${err.stack}`);
  res.status(500).json({
    status: "Error",
    message: "Internal Server Middleware Fault Triggered!",
    error: err.message
  });
});

// App Engine Server Port Injection Layer
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Production Server Lifecycle Triggered Successfully on Port: ${PORT}`);
});