const mongoose = require('mongoose');
require('dotenv').config();

const MandiData = require('./models/MandiData');
const SchemeData = require('./models/SchemeData');
const DiseaseData = require('./models/DiseaseData');


mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Database connected for Seeding!");

    const sampleSchemes = [
      { schemeName: "PM-Kisan", description: "Direct benefit transfer", eligibility: "Small farmers" }
    ];

    const sampleDiseases = [
      { diseaseName: "Leaf Rust", symptoms: "Brown spots", treatment: "Use Fungicide", cropAffected: "Wheat" }
    ];

    await SchemeData.insertMany(sampleSchemes);
    await DiseaseData.insertMany(sampleDiseases);

    console.log("Data Seeded Successfully!");
    process.exit(); // Script khatam karo
  })
  .catch(err => console.error("Error seeding data:", err));