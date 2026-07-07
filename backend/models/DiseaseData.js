const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    diseaseName: { type: String, required: true, trim: true, unique: true },
    symptoms: { type: String, required: true, trim: true },
    treatment: { type: String, required: true, trim: true },
    cropAffected: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('DiseaseData', DiseaseSchema);