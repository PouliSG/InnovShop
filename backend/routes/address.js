const express = require('express')
const router = express.Router()
const {
  addUserAddress,
  getUserAddresses,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require('../controllers/addressController')

const auth = require('../middleware/auth')
const checkRole = require('../middleware/role')

// Route pour ajouter une adresse à un utilisateur
router.post('/:userId', auth, checkRole(['employee', 'admin']), addUserAddress)

// Route pour obtenir les adresses d'un utilisateur
router.get('/:userId', auth, checkRole(['employee', 'admin']), getUserAddresses)

// Obtenir toutes les adresses
router.get('/', auth, checkRole(['employee', 'admin']), getAddresses)

// Mettre à jour une adresse
router.put('/:id', auth, checkRole(['employee', 'admin']), updateAddress)

// Supprimer une adresse
router.delete('/:id', auth, checkRole(['employee', 'admin']), deleteAddress)

module.exports = router
