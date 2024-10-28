const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const Student = require('../models/Students');
const auth = require('../middleware/auth');
const router = express.Router();

// Set up multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Upload Attendance Marks
router.post('/upload/attendance',  upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
      const { studentId, attendanceMarks } = item;
      await Student.findOneAndUpdate(
        { studentId },
        { $set: { attendanceMarks }, $inc: { totalMarks: attendanceMarks } },
        { upsert: true, new: true }
      );
    }

    res.json({ msg: 'Attendance marks uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error processing file' });
  }
});

// Upload Project Review Marks
router.post('/upload/project-review', auth, upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
      const { studentId, projectReviewMarks } = item;
      await Student.findOneAndUpdate(
        { studentId },
        { $set: { projectReviewMarks }, $inc: { totalMarks: projectReviewMarks } },
        { upsert: true, new: true }
      );
    }

    res.json({ msg: 'Project review marks uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error processing file' });
  }
});

// Upload Assessment Marks
router.post('/upload/assessment', auth, upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
      const { studentId, assessmentMarks } = item;
      await Student.findOneAndUpdate(
        { studentId },
        { $set: { assessmentMarks }, $inc: { totalMarks: assessmentMarks } },
        { upsert: true, new: true }
      );
    }

    res.json({ msg: 'Assessment marks uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error processing file' });
  }
});

// Upload Project Submission Marks
router.post('/upload/project-submission', auth, upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
      const { studentId, projectSubmissionMarks } = item;
      await Student.findOneAndUpdate(
        { studentId },
        { $set: { projectSubmissionMarks }, $inc: { totalMarks: projectSubmissionMarks } },
        { upsert: true, new: true }
      );
    }

    res.json({ msg: 'Project submission marks uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error processing file' });
  }
});

// Upload LinkedIn Post Marks
router.post('/upload/linkedin-post', auth, upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const item of data) {
      const { studentId, linkedInPostMarks } = item;
      await Student.findOneAndUpdate(
        { studentId },
        { $set: { linkedInPostMarks }, $inc: { totalMarks: linkedInPostMarks } },
        { upsert: true, new: true }
      );
    }

    res.json({ msg: 'LinkedIn post marks uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error processing file' });
  }
});

// Get Student Results by ID
router.get('/results/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
