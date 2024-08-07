const Address = require('../models/Address')

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

module.exports = { addAddress, getAddresses }
