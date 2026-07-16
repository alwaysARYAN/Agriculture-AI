const mongoose = require('mongoose'); 
 
const UserSchema = new mongoose.Schema({ 
  name: { 
    type: String, 
    required: [true, 'Kisan ka naam save karna mandatory hai'] 
  }, 
  mobile: { 
    type: String, 
    required: [true, '10-digit mobile number input zaroori hai'], 
    unique: true, // Ek number par double mapping trace nahi hogi 
    match: [/^[0-9]{10}$/, 'Valid mobile profile required'] 
  }, 
  password: { 
    type: String, 
    required: [true, 'Encrypted hash token protection mandatory hai'] 
  }, 
  district: { 
    type: String, 
    required: [true, 'Farmer area registration area mandatory hai'] 
  } 
}, { 
  timestamps: true // Creates 'createdAt' and 'updatedAt' tracking states 
}); 
 
module.exports = mongoose.model('User', UserSchema); 