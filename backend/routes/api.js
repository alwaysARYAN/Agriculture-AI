const express = require('express');
const router = express.Router();

// Models import karo
const SchemeData = require('../models/SchemeData');
const DiseaseData = require('../models/DiseaseData');
const MandiData = require('../models/MandiData');

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

module.exports = router;