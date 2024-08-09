const express = require('express')
const router = express.Router()
const {
  addItemToCart,
  getCart,
  removeItemFromCart,
} = require('../controllers/cartController')

// Add item to cart
router.post('/', addItemToCart)

// Get cart
router.get('/', getCart)

// Remove item from cart
router.delete('/', removeItemFromCart)

module.exports = router
