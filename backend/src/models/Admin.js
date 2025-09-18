const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  position: String,
  hireDate: {
    type: Date,
    required: true
  },
  permissions: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);