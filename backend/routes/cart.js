const express = require('express')
const router = express.Router()
const {
  addItemToCart,
  getCart,
  removeItemFromCart,
  saveCart,
  deleteCart,
  deleteCartUser,
} = require('../controllers/cartController')

const auth = require('../middleware/auth')

// Add item to cart
router.post('/', auth, addItemToCart)

// Get cart
router.get('/', auth, getCart)

// Remove item from cart
router.put('/:id', auth, removeItemFromCart)

// Save cart
router.post('/save', auth, saveCart)

// Delete the cart
router.delete('/', auth, deleteCart)

// Delete cart from user
router.delete('/:userId', auth, deleteCartUser)

module.exports = router
