// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subjects: [
    {
      subjectName: String,
      score: Number,
    },
  ],
  linkedin: {
    type: String,
  },
});

module.exports = mongoose.model('Students', StudentSchema);
