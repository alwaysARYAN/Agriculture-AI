const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    diseaseName: { type: String, required: true },
    symptoms: { type: String, required: true }, // Symptoms ki details
    treatment: { type: String, required: true }, // Treatment steps
    cropAffected: String // Kaunsi fasal par asar padta hai
});

module.exports = mongoose.model('DiseaseData', DiseaseSchema);