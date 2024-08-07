const mongoose = require('mongoose')

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
    default: false,
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
})

module.exports = mongoose.model('User', UserSchema)
