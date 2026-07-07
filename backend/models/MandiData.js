const mongoose = require('mongoose');
const MandiSchema = new mongoose.Schema({
    marketName: { type: String, required: true, trim: true },
    cropName: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 } 
});
module.exports = mongoose.model('MandiData', MandiSchema);