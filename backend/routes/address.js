const express = require('express')
const router = express.Router()
const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require('../controllers/addressController')
const auth = require('../middleware/auth')

// Route pour ajouter une adresse
router.post('/', auth, addAddress)

// Route pour obtenir les adresses d'un utilisateur
router.get('/', auth, getAddresses)

// Update an address
router.put('/:id', auth, updateAddress)

// Add the delete route after the update route
router.delete('/:id', auth, deleteAddress)

module.exports = router
