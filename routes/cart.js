const express = require('express')
const router = express.Router()
const {
  addItemToCart,
  getCart,
  removeItemFromCart,
} = require('../controllers/cartController')
const auth = require('../middleware/auth')

// Add item to cart
router.post('/', auth, addItemToCart)

// Get cart
router.get('/', auth, getCart)

// Remove item from cart
router.delete('/', auth, removeItemFromCart)

module.exports = router
