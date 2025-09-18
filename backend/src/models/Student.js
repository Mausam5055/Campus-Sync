const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  enrollmentDate: {
    type: Date,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  guardianInfo: {
    name: String,
    relationship: String,
    phoneNumber: String,
    email: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);