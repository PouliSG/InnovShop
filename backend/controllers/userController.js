const User = require('../models/User')
const Address = require('../models/Address')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Ajouter un utilisateur
const addUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    role = 'user',
    gender = null,
    birthdate = null,
    newsletter_optin = false,
  } = req.body

  try {
    let user = await User.findOne({
      email,
    })
    if (user) {
      return res.status(400).json({ msg: "L'utilisateur existe déjà" })
    }

    user = new User({
      firstname,
      lastname,
      email,
      password,
      gender,
      birthdate,
      role,
      newsletter_optin,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    res.status(200).json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Obtenir le profil de l'utilisateur
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur introuvable' })
    }

    res.status(200).json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Mise à jour des informations de profil
const updateUserProfile = async (req, res) => {
  const { firstname, lastname, gender, birthdate, newsletter_optin } = req.body

  try {
    let user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur introuvable' })
    }

    user.firstname = firstname || user.firstname
    user.lastname = lastname || user.lastname
    user.gender = gender || user.gender
    user.birthdate = birthdate || user.birthdate
    user.newsletter_optin = newsletter_optin || user.newsletter

    await user.save()

    res.status(200).json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Obtenir tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Obtenir un utilisateur
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur introuvable' })
    }

    res.status(200).json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Obtenir le rôle de l'utilisateur
const getUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('role')
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur introuvable' })
    }

    res.status(200).json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ msg: 'Utilisateur supprimé' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Supprimer soi-même l'utilisateur
const selfDeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id)
    res.status(200).json({ msg: 'Utilisateur supprimé' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Promouvoir un utilisateur en administrateur
const promoteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur introuvable' })
    }

    user.role = req.body.role || 'admin' // Autoriser l'attribution de rôle
    await user.save()

    res
      .status(200)
      .json({ msg: "Rôle de l'utilisateur mis à jour avec succès", user })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Mettre à jour le rôle de l'utilisateur
const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur introuvable' })
    }

    user.role = req.body.role
    await user.save()

    res
      .status(200)
      .json({ msg: "Rôle de l'utilisateur mis à jour avec succès", user })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Obtenir les paramètres de l'utilisateur
const getUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('settings')
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur introuvable' })
    }

    res.status(200).json(user.settings)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Mettre à jour les paramètres de l'utilisateur
const updateUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur introuvable' })
    }

    user.settings = { ...user.settings.toObject(), ...req.body }
    await user.save()

    res.status(200).json({
      msg: "Paramètres de l'utilisateur mis à jour avec succès",
      settings: user.settings,
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Ajouter une adresse
const addAddress = async (req, res) => {
  const { number, street, additional, city, zip, country, label, isDefault } =
    req.body

  try {
    const userAddresses = await Address.find({ user: req.user.id })

    // Déterminer la valeur finale de isDefault
    const finalIsDefault = userAddresses.length === 0 ? true : isDefault

    if (finalIsDefault) {
      // S'assurer qu'une seule adresse est marquée comme par défaut
      await Address.updateMany(
        { user: req.user.id },
        { $set: { isDefault: false } }
      )
    }

    const newAddress = new Address({
      user: req.user.id,
      number,
      street,
      additional,
      city,
      zip,
      country,
      label,
      isDefault: finalIsDefault,
    })

    const address = await newAddress.save()
    res.status(200).json(address)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Obtenir les adresses d'un utilisateur
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id })
    res.status(200).json(addresses)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Obtenir une adresse par son ID
const getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id)
    if (!address) {
      return res.status(404).json({ msg: 'Adresse introuvable' })
    }
    res.status(200).json(address)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Mettre à jour une adresse
const updateAddress = async (req, res) => {
  const { id } = req.params
  const { number, street, additional, city, zip, country, label, isDefault } =
    req.body

  try {
    // S'assurer qu'une seule adresse est marquée comme par défaut
    if (isDefault) {
      await Address.updateMany(
        { user: req.user.id },
        { $set: { isDefault: false } }
      )
    }

    const address = await Address.findOneAndUpdate(
      { _id: id, user: req.user.id },
      {
        number,
        street,
        additional,
        city,
        zip,
        country,
        label,
        isDefault,
      },
      { new: true }
    )

    if (!address) {
      return res.status(404).json({ msg: 'Adresse introuvable' })
    }

    res.status(200).json(address)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

// Supprimer une adresse
const deleteAddress = async (req, res) => {
  const { id } = req.params

  try {
    const address = await Address.findOneAndDelete({
      _id: id,
      user: req.user.id,
    })

    if (!address) {
      return res.status(404).json({ msg: 'Adresse introuvable' })
    }

    res.status(200).json({ msg: 'Adresse supprimée' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur du serveur')
  }
}

module.exports = {
  addUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUser,
  getUserRole,
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
}
