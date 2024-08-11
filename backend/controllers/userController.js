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
  } = req.body

  try {
    let user = await User.findOne({
      email,
    })
    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    user = new User({
      firstname,
      lastname,
      email,
      password,
      gender,
      birthdate,
      role,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Mise à jour des informations de profil
const updateUserProfile = async (req, res) => {
  const { firstname, lastname, gender, birthdate } = req.body

  try {
    let user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    user.firstname = firstname || user.firstname
    user.lastname = lastname || user.lastname
    user.gender = gender || user.gender
    user.birthdate = birthdate || user.birthdate

    await user.save()

    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Self Delete User
const selfDeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id)
    res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Promote a user to admin
const promoteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    user.role = req.body.role || 'admin' // Allow role assignment
    await user.save()

    res.json({ msg: 'User role updated successfully', user })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Update user role
const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    user.role = req.body.role
    await user.save()

    res.json({ msg: 'User role updated successfully', user })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Update user settings
const updateUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    user.settings = req.body.settings || user.settings // Add new settings fields as needed
    await user.save()

    res.json({
      msg: 'User settings updated successfully',
      settings: user.settings,
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Ajouter une adresse
const addAddress = async (req, res) => {
  const { number, street, additional, city, zip, country, label, isDefault } =
    req.body

  try {
    const userAddresses = await Address.find({ user: req.user.id })

    // Determine the final value of isDefault
    const finalIsDefault = userAddresses.length === 0 ? true : isDefault

    if (finalIsDefault) {
      // Ensure only one address is marked as default
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
    res.json(address)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Obtenir les adresses d'un utilisateur
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id })
    res.json(addresses)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Update an address
const updateAddress = async (req, res) => {
  const { id } = req.params
  const { number, street, additional, city, zip, country, label, isDefault } =
    req.body

  try {
    // Ensure only one address is marked as default
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
      return res.status(404).json({ msg: 'Address not found' })
    }

    res.json(address)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Delete an address
const deleteAddress = async (req, res) => {
  const { id } = req.params

  try {
    const address = await Address.findOneAndDelete({
      _id: id,
      user: req.user.id,
    })

    if (!address) {
      return res.status(404).json({ msg: 'Address not found' })
    }

    res.json({ msg: 'Address deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = {
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
}
