const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  credits: {
    type: Number,
    required: true
  },
  semester: Number,
  branch: String,
  prerequisites: [String],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  schedule: {
    days: [String],
    startTime: String,
    endTime: String,
    room: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);