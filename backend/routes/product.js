const express = require('express')
const router = express.Router()
const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController')
const auth = require('../middleware/auth')
const checkRole = require('../middleware/role')

// Get all products
router.get('/', getProducts)

// Add product (employee and admin only)
router.post('/', auth, checkRole(['employee', 'admin']), addProduct)

// Update product (employee and admin only)
router.put('/:id', auth, checkRole(['employee', 'admin']), updateProduct)

// Delete product (employee and admin only)
router.delete('/:id', auth, checkRole(['employee', 'admin']), deleteProduct)

module.exports = router
