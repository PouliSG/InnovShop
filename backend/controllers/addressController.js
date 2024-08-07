const Address = require('../models/Address')

// Ajouter une adresse
const addAddress = async (req, res) => {
  const { street, city, state, zip, country } = req.body

  try {
    const newAddress = new Address({
      user: req.user.id,
      street,
      city,
      state,
      zip,
      country,
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

module.exports = { addAddress, getAddresses }
