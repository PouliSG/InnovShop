const express = require('express')
const router = express.Router()
const {
  addUser,
  getUserProfile,
  updateUserProfile,
  getUser,
  getUserRole,
  getUsers,
  deleteUser,
  selfDeleteUser,
  promoteUser,
  updateUserRole,
  getUserSettings,
  updateUserSettings,
  addAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require('../controllers/userController')
const auth = require('../middlewares/auth')
const checkRole = require('../middlewares/role')

// Mettre à jour le profil de l'utilisateur
router.put('/profile', auth, updateUserProfile)

// Mettre à jour les paramètres de l'utilisateur
router.put('/settings', auth, updateUserSettings)

// Ajouter une adresse
router.post('/address', auth, addAddress)

// Obtenir les adresses de l'utilisateur
router.get('/addresses', auth, getAddresses)

// Obtenir l'adresse de l'utilisateur par son id
router.get('/address/:id', auth, getAddressById)

// Mettre à jour une adresse
router.put('/address/:id', auth, updateAddress)

// Supprimer une adresse
router.delete('/address/:id', auth, deleteAddress)

// Obtenir les paramètres de l'utilisateur
router.get('/settings', auth, getUserSettings)

// Obtenir l'utilisateur actuel (réservé aux utilisateurs)
router.get('/profile', auth, getUserProfile)

// Obtenir l'utilisateur
router.get('/:id', auth, getUser)

// Obtenir le rôle de l'utilisateur
router.get('/:id/role', auth, getUserRole)

// Supprimer l'utilisateur actuel (réservé aux utilisateurs)
router.delete('/', auth, checkRole(['user']), selfDeleteUser)

// Ajouter un nouvel utilisateur (réservé aux administrateurs)
router.post('/', auth, checkRole(['admin']), addUser)

// Obtenir tous les utilisateurs
router.get('/', auth, checkRole(['employee', 'admin']), getUsers)

// Supprimer un utilisateur
router.delete('/:id', auth, checkRole(['admin']), deleteUser)

// Mettre à jour le rôle de l'utilisateur
router.put('/:id/role', auth, checkRole(['admin']), updateUserRole)

// Promouvoir un utilisateur en administrateur
router.put('/:id/promote', auth, checkRole(['admin']), promoteUser)

module.exports = router
