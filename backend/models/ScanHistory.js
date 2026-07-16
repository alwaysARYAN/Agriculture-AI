const mongoose = require('mongoose'); 
 
const ScanHistorySchema = new mongoose.Schema({ 
  farmerId: { 
    type: mongoose.Schema.Types.ObjectId, // Link directly back to User document instance 
    ref: 'User', 
    required: true 
  }, 
  cropName: { 
    type: String, 
    required: [true, 'Scanned crop object designation mandatory'] 
  }, 
  detectedDisease: { 
    type: String, 
    required: [true, 'AI classification prediction storage output mandatory'] 
  }, 
  symptomsLocalized: { 
    type: String, // Localized symptoms string parsed from Sonal's sheet reference map 
    required: true 
  }, 
  treatmentOrganic: { 
    type: String, // Organic counter-measures text block trace 
    required: true 
  }, 
  treatmentChemical: { 
    type: String, // Chemical cure parameters block trace 
    required: true 
  } 
}, { 
  timestamps: true 
}); 
 
module.exports = mongoose.model('ScanHistory', ScanHistorySchema);