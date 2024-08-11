const Address = require('../models/Address')

// Ajouter une adresse pour un utilisateur
const addUserAddress = async (req, res) => {
  const { userId } = req.params
  const { number, street, additional, city, zip, country, label, isDefault } =
    req.body

  try {
    const userAddresses = await Address.find({ user: userId })

    // Determine the final value of isDefault
    const finalIsDefault = userAddresses.length === 0 ? true : isDefault

    if (finalIsDefault) {
      // Ensure only one address is marked as default
      await Address.updateMany({ user: userId }, { $set: { isDefault: false } })
    }

    const newAddress = new Address({
      user: userId,
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

// Obtenir les addresses d'un utilisateur
const getUserAddresses = async (req, res) => {
  const { userId } = req.params
  try {
    const addresses = await Address.find({ user: userId })
    res.json(addresses)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Obtenir toutes les adresses
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find()
    res.json(addresses)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Update an address
const updateAddress = async (req, res) => {
  const { id } = req.params
  const {
    user,
    number,
    street,
    additional,
    city,
    zip,
    country,
    label,
    isDefault,
  } = req.body

  try {
    // Ensure only one address is marked as default
    if (isDefault) {
      await Address.updateMany({ user: user }, { $set: { isDefault: false } })
    }

    const address = await Address.findOneAndUpdate(
      { _id: id, user: user },
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
  addUserAddress,
  getUserAddresses,
  getAddresses,
  updateAddress,
  deleteAddress,
}
