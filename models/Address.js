const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  additional: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: 'France',
  },
})

module.exports = mongoose.model('Address', AddressSchema)
