const express = require('express')
const router = express.Router()
const {
  addCategory,
  getCategoryById,
  getCategories,
  deleteCategory,
  updateCategory,
} = require('../controllers/categoryController')
const auth = require('../middlewares/auth')
const checkRole = require('../middlewares/role')

// Route pour ajouter une catégorie
router.post('/', auth, checkRole(['employee', 'admin']), addCategory)

// Route pour obtenir une catégorie par ID
router.get('/:id', getCategoryById)

// Route pour obtenir toutes les catégories
router.get('/', getCategories)

// Update category (employee and admin only)
router.put('/:id', auth, checkRole(['employee', 'admin']), updateCategory)

// Route pour supprimer une catégorie
router.delete('/:id', auth, checkRole(['employee', 'admin']), deleteCategory)

module.exports = router
