const Address = require('../models/Address')

// Ajouter une adresse
const addUserAddress = async (req, res) => {
  const { userId } = req.params
  let { number, street, additional, city, zip, country, label, isDefault } =
    req.body

  try {
    const userAddresses = await Address.find({ user: userId })

    // Définir isDefault à true si c'est la première adresse de l'utilisateur
    if (userAddresses.length === 0) {
      isDefault = true
    } else if (isDefault) {
      // S'assurer qu'une seule adresse est définie par défaut
      await Address.updateMany({ user: userId }, { $set: { isDefault: false } })
    }

    // Création d'une nouvelle adresse
    const newAddress = new Address({
      user: userId,
      number,
      street,
      additional,
      city,
      zip,
      country,
      label,
      isDefault,
    })

    // Enregistrement de l'adresse dans la base de données
    const address = await newAddress.save()
    res.json(address)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
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
    res.status(500).send('Erreur serveur')
  }
}

// Mettre à jour une adresse
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
    // S'assurer qu'une seule adresse est définie par défaut
    if (isDefault) {
      await Address.updateMany({ user: user }, { $set: { isDefault: false } })
    }

    // Mise à jour de l'adresse existante
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
      return res.status(404).json({ msg: 'Adresse non trouvée' })
    }

    res.json(address)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Supprimer une adresse
const deleteAddress = async (req, res) => {
  const { id } = req.params

  try {
    const address = await Address.findOneAndDelete({
      _id: id,
    })

    if (!address) {
      return res.status(404).json({ msg: 'Adresse non trouvée' })
    }

    res.json({ msg: 'Adresse supprimée' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

module.exports = {
  addUserAddress,
  getUserAddresses,
  getAddresses,
  updateAddress,
  deleteAddress,
}
