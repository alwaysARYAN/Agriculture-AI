const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
    schemeName: { type: String, required: true, trim: true },
    description: { type: String, required: true, minlength: 10 },
    eligibility: { type: String, required: true, trim: true },
    link: { type: String, default: "#" }
});

module.exports = mongoose.model('SchemeData', SchemeSchema);