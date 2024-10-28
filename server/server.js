// server.js
const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

const Student = require('./models/Students');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection (replace with your MongoDB URI)
mongoose.connect('mongodb+srv://rounder135:KvBkotT4mfxtw6Le@cluster0.ziwn2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.get('/api/student/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
