const express = require('express')
const router = express.Router()
const {
  addProduct,
  getProducts,
  deleteProduct,
} = require('../controllers/productController')
const auth = require('../middleware/auth')

// Route pour ajouter un produit
router.post('/', auth, addProduct)

// Route pour obtenir tous les produits
router.get('/', getProducts)

// Route pour supprimer un produit
router.delete('/:id', auth, deleteProduct)

module.exports = router
