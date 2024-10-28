// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Students'); // Assuming you have a Student model set up



// POST update score for a specific student
router.post('/:rollNo/score', async (req, res) => {
    const { rollNo } = req.params;
    const { subject, score } = req.body;
  
    try {
      const student = await Student.findOne({ rollNo });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Check if subject already exists in the student's subjects
      const existingSubject = student.subjects.find((sub) => sub.subjectName === subject);
      if (existingSubject) {
        // Update the score if the subject already exists
        existingSubject.score = score;
      } else {
        // Add a new subject with the score
        student.subjects.push({ subjectName: subject, score });
      }
  
      await student.save();
      res.json({ message: 'Score updated successfully', student });
    } catch (error) {
      res.status(500).json({ message: 'Error updating score', error });
    }
  });
  

router.get('/', async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error });
    }
  });
// POST /api/student/login
router.post('/login', async (req, res) => {
  const { rollNo } = req.body;

  try {
    // Find student by roll number
    const student = await Student.findOne({ rollNo });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // If found, return a success response (you might also include a JWT for authentication)
    res.json({ message: 'Login successful', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
