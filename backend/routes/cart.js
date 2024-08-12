const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()
const {
  addItemToCart,
  getCart,
  removeItemFromCart,
  saveCart,
  deleteCart,
  deleteCartUser,
} = require('../controllers/cartController')

// Ajouter un article au panier
router.post('/', auth, addItemToCart)

// Obtenir le panier
router.get('/', auth, getCart)

// Supprimer un article du panier
router.put('/:id', auth, removeItemFromCart)

// Enregistrer le panier
router.post('/save', auth, saveCart)

// Supprimer le panier
router.delete('/', auth, deleteCart)

// Supprimer le panier d'un utilisateur
router.delete('/:userId', auth, deleteCartUser)

module.exports = router
