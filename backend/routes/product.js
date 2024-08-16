const express = require('express')
const router = express.Router()
const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController')
const auth = require('../middlewares/auth')
const checkRole = require('../middlewares/role')

// Obtenir tous les produits
router.get('/', getProducts)

// Ajouter un produit (employé et administrateur uniquement)
router.post('/', auth, checkRole(['employee', 'admin']), addProduct)

// Mettre à jour un produit (employé et administrateur uniquement)
router.put('/:id', auth, checkRole(['employee', 'admin']), updateProduct)

// Supprimer un produit (employé et administrateur uniquement)
router.delete('/:id', auth, checkRole(['employee', 'admin']), deleteProduct)

module.exports = router
