// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Assuming you have an Admin model set up
const bcrypt = require('bcrypt');

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check password (assuming password is hashed)
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If valid, return a success response (you might also include a JWT for authentication)
    res.json({ message: 'Login successful', admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// routes/adminRoutes.js (Add this for testing purposes)
router.post('/add', async (req, res) => {
    const { username, password } = req.body;
    try {
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      res.json({ message: 'Admin created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating admin', error });
    }
  });
  

module.exports = router;
