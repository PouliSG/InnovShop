const express = require('express')
const router = express.Router()
const {
  addCategory,
  getCategories,
  deleteCategory,
} = require('../controllers/categoryController')
const auth = require('../middleware/auth')

// Route pour ajouter une catégorie
router.post('/', auth, addCategory)

// Route pour obtenir toutes les catégories
router.get('/', getCategories)

// Route pour supprimer une catégorie
router.delete('/:id', auth, deleteCategory)

module.exports = router
