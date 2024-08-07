const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  featured: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Product', ProductSchema)
