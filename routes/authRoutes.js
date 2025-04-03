// routes/authRoutes.js
const express = require('express');
const {
  register,
  login,
  logout,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.post('/register', register);
router.post('/login', login);

// Routes protégées
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;