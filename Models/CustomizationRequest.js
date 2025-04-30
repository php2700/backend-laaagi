const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customizationRequestSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'], 
    trim: true 
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model('CustomizationRequest', customizationRequestSchema);