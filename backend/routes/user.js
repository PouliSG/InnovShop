const express = require('express')
const router = express.Router()
const {
  addUser,
  updateUserProfile,
  addAddress,
  getAddresses,
  getUsers,
  deleteUser,
  selfDeleteUser,
} = require('../controllers/userController')
const auth = require('../middleware/auth')
const checkRole = require('../middleware/role')

// Add a new user (admin only)
router.post('/', auth, checkRole(['admin']), addUser)

// Mise à jour du profil de l'utilisateur
router.put('/profile', auth, updateUserProfile)

// Get all users
router.get('/', auth, checkRole(['employee', 'admin']), getUsers)

// Delete a user
router.delete('/:id', auth, checkRole(['admin']), deleteUser)

// Delete current user (user only)
router.delete('/', auth, checkRole(['user']), selfDeleteUser)

// Ajouter une adresse
router.post('/address', auth, addAddress)

// Obtenir les adresses de l'utilisateur
router.get('/addresses', auth, getAddresses)

module.exports = router
