const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// POST /signup
router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  console.log('Signup request:', { username, email, password: password ? 'Present' : 'Missing' });
  console.log('JWT_SECRET for signup:', process.env.JWT_SECRET ? 'Present' : 'Missing');
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword,
      email: email || '',
      role: 'user'
    });

    await user.save();
    console.log('User created successfully:', user._id);

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username }, 
      process.env.JWT_SECRET_KEY, 
      { expiresIn: '1h' }
    );
    console.log('Token generated for signup:', token ? 'Present' : 'Missing');

    res.status(201).json({ 
      message: 'User created successfully',
      token 
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login request:', { username, password: password ? 'Present' : 'Missing' });
  console.log('JWT_SECRET for login:', process.env.JWT_SECRET ? 'Present' : 'Missing');
  
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    console.log('Token generated for login:', token ? 'Present' : 'Missing');
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;