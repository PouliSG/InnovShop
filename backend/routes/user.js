const express = require('express')
const router = express.Router()
const {
  addUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  selfDeleteUser,
  promoteUser,
  updateUserRole,
  updateUserSettings,
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require('../controllers/userController')
const auth = require('../middleware/auth')
const checkRole = require('../middleware/role')

// Ajouter un nouvel utilisateur (réservé aux administrateurs)
router.post('/', auth, checkRole(['admin']), addUser)

// Mettre à jour le profil de l'utilisateur
router.put('/profile', auth, updateUserProfile)

// Obtenir tous les utilisateurs
router.get('/', auth, checkRole(['employee', 'admin']), getUsers)

// Supprimer un utilisateur
router.delete('/:id', auth, checkRole(['admin']), deleteUser)

// Supprimer l'utilisateur actuel (réservé aux utilisateurs)
router.delete('/', auth, checkRole(['user']), selfDeleteUser)

// Mettre à jour le rôle de l'utilisateur
router.put('/:id/role', auth, checkRole(['admin']), updateUserRole)

// Promouvoir un utilisateur en administrateur
router.put('/:id/promote', auth, checkRole(['admin']), promoteUser)

// Mettre à jour les paramètres de l'utilisateur
router.put('/:id/settings', auth, updateUserSettings)

// Ajouter une adresse
router.post('/address', auth, addAddress)

// Obtenir les adresses de l'utilisateur
router.get('/addresses', auth, getAddresses)

// Mettre à jour une adresse
router.put('/address/:id', auth, updateAddress)

// Supprimer une adresse
router.delete('/address/:id', auth, deleteAddress)

module.exports = router
