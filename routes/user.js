const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  updateUserProfile,
  addAddress,
  getAddresses,
} = require('../controllers/userController')
const auth = require('../middleware/auth')

// Inscription d'un utilisateur
router.post('/register', registerUser)

// Connexion d'un utilisateur
router.post('/login', loginUser)

// Mise à jour du profil de l'utilisateur
router.put('/profile', auth, updateUserProfile)

// Ajouter une adresse
router.post('/address', auth, addAddress)

// Obtenir les adresses de l'utilisateur
router.get('/addresses', auth, getAddresses)

module.exports = router
