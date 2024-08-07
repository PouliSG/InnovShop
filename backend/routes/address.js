const express = require('express')
const router = express.Router()
const { addAddress, getAddresses } = require('../controllers/addressController')
const auth = require('../middleware/auth')

// Route pour ajouter une adresse
router.post('/', auth, addAddress)

// Route pour obtenir les adresses d'un utilisateur
router.get('/', auth, getAddresses)

module.exports = router
