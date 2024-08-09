const express = require('express')
const router = express.Router()
const {
  placeOrder,
  getOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrdersByUser,
} = require('../controllers/orderController')
const auth = require('../middleware/auth')
const checkRole = require('../middleware/role')

// Route pour passer une commande
router.post('/', auth, placeOrder)

// Route pour obtenir les commandes de l'utilisateur
router.get('/', auth, checkRole(['user']), getOrders)

// Route pour obtenir toutes les commandes (employee and admin only)
router.get('/all', auth, checkRole(['employee', 'admin']), getAllOrders)

// Route pour obtenir une commande par son id (employee and admin only)
router.get('/:id', auth, checkRole(['employee', 'admin']), getOrderById)

// Route pour mettre à jour le statut de la commande (employee and admin only)
router.put('/:id', auth, checkRole(['employee', 'admin']), updateOrderStatus)

// Route pour supprimer une commande (employee and admin only)
router.delete('/:id', auth, checkRole(['employee', 'admin']), deleteOrder)

// Route pour obtenir les commandes d'un utilisateur (employee and admin only)
router.get('/user/:id', auth, checkRole(['employee', 'admin']), getOrdersByUser)

module.exports = router
