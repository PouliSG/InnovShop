const Address = require('../models/Address')

// Ajouter une adresse
const addAddress = async (req, res) => {
  let { number, street, additional, city, zip, country, label, isDefault } =
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

    console.log('Final isDefault:', finalIsDefault)

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

module.exports = { addAddress, getAddresses, updateAddress, deleteAddress }
