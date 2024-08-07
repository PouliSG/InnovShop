const User = require('../models/User')
const Address = require('../models/Address')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Inscription d'un utilisateur
const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, gender, birthdate } = req.body

  try {
    let user = await User.findOne({ email })
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
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    // Update last login date
    user.last_login_date = Date.now()
    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Mise à jour des informations de profil
const updateUserProfile = async (req, res) => {
  const { firstname, lastname, email, gender, birthdate } = req.body

  try {
    let user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }

    user.firstname = firstname || user.firstname
    user.lastname = lastname || user.lastname
    user.email = email || user.email
    user.gender = gender || user.gender
    user.birthdate = birthdate || user.birthdate

    await user.save()

    res.json(user)
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

    // Set isDefault to true if this is the user's first address
    if (userAddresses.length === 0) {
      isDefault = true
    } else if (isDefault) {
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
      isDefault,
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

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  addAddress,
  getAddresses,
}
