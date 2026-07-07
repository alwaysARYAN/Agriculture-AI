const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
    schemeName: { type: String, required: true },
    description: { type: String, required: true },
    eligibility: { type: String, required: true },
    link: String 
});

module.exports = mongoose.model('SchemeData', SchemeSchema);