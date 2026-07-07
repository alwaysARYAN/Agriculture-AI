const mongoose = require('mongoose');
const MandiSchema = new mongoose.Schema({
    cropName: String,
    price: Number,
    marketLocation: String
});
module.exports = mongoose.model('MandiData', MandiSchema);