const express = require('express')
const router = express.Router()
const {
  addProduct,
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  getLatestProducts,
  getFeaturedProducts,
  getProductsByCategory,
} = require('../controllers/productController')
const auth = require('../middlewares/auth')
const checkRole = require('../middlewares/role')

// Obtenir tous les produits
router.get('/', getProducts)

// Route pour récupérer les derniers produits
router.get('/latest', getLatestProducts)

// Route pour récupérer les produits à la une
router.get('/featured', getFeaturedProducts)

// Route pour récupérer les produits par catégorie
router.get('/category/:category_id', getProductsByCategory)

// Ajouter un produit (employé et administrateur uniquement)
router.post('/', auth, checkRole(['employee', 'admin']), addProduct)

// Obtenir un produit par son ID
router.get('/:id', getProductById)

// Mettre à jour un produit (employé et administrateur uniquement)
router.put('/:id', auth, checkRole(['employee', 'admin']), updateProduct)

// Supprimer un produit (employé et administrateur uniquement)
router.delete('/:id', auth, checkRole(['employee', 'admin']), deleteProduct)

module.exports = router
