const express = require('express')
const router = express.Router()
const { placeOrder, getOrders } = require('../controllers/orderController')
const auth = require('../middleware/auth')

// Route pour passer une commande
router.post('/', auth, placeOrder)

// Route pour obtenir les commandes de l'utilisateur
router.get('/', auth, getOrders)

module.exports = router
