const mongoose = require('mongoose')

// Define the Settings Schema
const SettingsSchema = new mongoose.Schema({
  notifications: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: 'light', // or 'dark'
  },
  language: {
    type: String,
    default: 'fr',
  },
  dense: {
    type: Boolean,
    default: true,
  },
})

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  signup_date: {
    type: Date,
    default: Date.now,
  },
  last_login_date: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  gender: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['user', 'employee', 'admin'],
    default: 'user',
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  settings: {
    type: SettingsSchema, // Embed the settings schema
    default: () => ({}), // Initialize with default settings
  },
  newsletter_optin: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('User', UserSchema)
