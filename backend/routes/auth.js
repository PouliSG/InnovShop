const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController')

// Register user
router.post('/register', registerUser)

// Login user
router.post('/login', loginUser)

// Forgot Password
router.post('/forgot', forgotPassword)

// Reset Password
router.post('/reset/:token', resetPassword)

module.exports = router
