const express = require('express');
const router = express.Router();

// Models Import
const SchemeData = require('../models/SchemeData');
const DiseaseData = require('../models/DiseaseData');
const MandiData = require('../models/MandiData');
const csv = require('csvtojson');
// 1. Mandi Bhav Route
router.get('/mandi', async (req, res) => {
    try {
        const data = await MandiData.find();
        if (data.length === 0) return res.status(404).json({ message: "No Mandi data found" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Server Error: " + err.message });
    }
});

// 2. Schemes Route
router.get('/schemes', async (req, res) => {
    try {
        const data = await SchemeData.find();
        if (data.length === 0) return res.status(404).json({ message: "No Schemes data found" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Server Error: " + err.message });
    }
});

// 3. Diseases Route
router.get('/diseases', async (req, res) => {
    try {
        const data = await DiseaseData.find();
        if (data.length === 0) return res.status(404).json({ message: "No Disease data found" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Server Error: " + err.message });
    }
});

// 🚀 4. Smart AI Assistant Endpoint (Direct Native Fetch Method)
// 🚀 4. Smart AI Assistant Endpoint (Stable v1 API Version)
// 🚀 4. Smart AI Assistant Endpoint (Official New Generation Model Update)
router.post('/ask-ai', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return res.status(400).json({ error: "Query field is required" });

        const apiKey = process.env.GEMINI_API_KEY; // `.env` mein apni AQ वाली key dale rakho
        
        const systemPrompt = `You are an expert Virtual Agriculture Assistant named 'AgriSmart'. Assist farmers with scientific, accurate, and easy-to-understand solutions in Hinglish/Hindi or English. Query: ${query}`;

        // New gemini-2.5-flash model signature call
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: systemPrompt }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(data.error.code || 400).json({ error: data.error.message });
        }

        const responseText = data.candidates[0].content.parts[0].text;

        res.json({ 
            success: true,
            botResponse: responseText 
        });
    } catch (err) {
        res.status(500).json({ error: "AI Assistant Error: " + err.message });
    }
});

// 🌾 5. Live Mandi Bhav Endpoint (Official Gov API Integration)
// 🌾 5. Proper Live Mandi Bhav Endpoint (India Mandi Price API Integration)
// 🌐 Base URL jo tumne publish karke generate kiya hai
const BASE_PUBLISH_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR5VYq2Uupjo8xaykMyNgu60VS1PyimzbzQNqjG3X5Wm6c5rEQ0n1xRt-aTsUGCdRcOeiYp9AXKW1Vq/pub?output=csv";

// Helper function: Google Sheet se alag-alag tabs fetch karne ke liye
async function fetchPublishedTab(gid) {
    const finalUrl = gid ? `${BASE_PUBLISH_URL}&gid=${gid}` : BASE_PUBLISH_URL;
    const response = await fetch(finalUrl);
    if (!response.ok) throw new Error("Google Sheets Web-Link accessible nahi hai.");
    const csvText = await response.text();
    return await csv().fromString(csvText);
}

// 🌾 1. Live Mandi Prices Route
router.get('/mandi/prices/crop/:cropName', async (req, res) => {
    try {
        const crop = req.params.cropName;
        if (!crop) return res.status(400).json({ success: false, message: "Crop name parameter is required." });

        const data = await fetchPublishedTab('0'); 
        const filteredRecords = data.filter(row => (row.cropEng || '').toLowerCase() === crop.toLowerCase());

        res.json({
            success: true,
            live: true,
            source: "Google Sheet Cloud Sync (Mandi Prices)",
            crop: crop,
            records: filteredRecords
        });
    } catch (err) {
        res.status(500).json({ success: false, error: "Mandi Sheet Sync Error: " + err.message });
    }
});

// 🚜 2. Government Schemes Route
router.get('/agri/schemes', async (req, res) => {
    try {
        const data = await fetchPublishedTab('1778472122'); 
        res.json({
            success: true,
            live: true,
            source: "Google Sheet Cloud Sync (Govt Schemes)",
            records: data
        });
    } catch (err) {
        res.status(500).json({ success: false, error: "Schemes Sheet Sync Error: " + err.message });
    }
});

// 🌐 3. UI Text Localization Route
router.get('/agri/uitext', async (req, res) => {
    try {
        const data = await fetchPublishedTab('516338985');
        res.json({
            success: true,
            live: true,
            source: "Google Sheet Cloud Sync (UI Text)",
            records: data
        });
    } catch (err) {
        res.status(500).json({ success: false, error: "UI Text Sheet Sync Error: " + err.message });
    }
});

// 🐛 4. Disease Guide Route
router.get('/agri/disease/:cropName', async (req, res) => {
    try {
        const crop = req.params.cropName;
        if (!crop) return res.status(400).json({ success: false, message: "Crop name parameter is required." });

        const data = await fetchPublishedTab('1260230998'); 
        const filteredRecords = data.filter(row => (row.cropName || '').toLowerCase() === crop.toLowerCase());

        res.json({
            success: true,
            live: true,
            source: "Google Sheet Cloud Sync (Disease Guide)",
            crop: crop,
            records: filteredRecords
        });
    } catch (err) {
        res.status(500).json({ success: false, error: "Disease Sheet Sync Error: " + err.message });
    }
});

module.exports = router;