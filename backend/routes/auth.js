const express = require('express')

const router = express.Router()
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController')

// Enregistrer un utilisateur
router.post('/register', registerUser)

// Connecter un utilisateur
router.post('/login', loginUser)

// Mot de passe oublié
router.post('/forgot', forgotPassword)

// Réinitialiser le mot de passe
router.post('/reset/:token', resetPassword)

module.exports = router
