const Category = require('../models/Category')

// Ajouter une catégorie
const addCategory = async (req, res) => {
  const { name, description } = req.body

  try {
    // Vérification si la catégorie existe déjà
    let category = await Category.findOne({ name })
    if (category) {
      return res.status(400).json({ msg: 'La catégorie existe déjà' })
    }

    // Création d'une nouvelle catégorie
    category = new Category({
      name,
      description,
    })

    await category.save()
    res.status(201).json(category)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Obtenir toutes les catégories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Obtenir une catégorie par ID
const getCategoryById = async (req, res) => {
  const { id } = req.params

  try {
    const category = await Category.findById(id)
    if (!category) {
      return res.status(404).json({ msg: 'Catégorie non trouvée' })
    }

    res.status(200).json(category)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Mettre à jour une catégorie
const updateCategory = async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  try {
    // Mise à jour de la catégorie existante
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    )

    if (!category) {
      return res.status(404).json({ msg: 'Catégorie non trouvée' })
    }

    res.status(200).json(category)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Supprimer une catégorie
const deleteCategory = async (req, res) => {
  const { id } = req.params

  try {
    const category = await Category.findByIdAndDelete(id)
    if (!category) {
      return res.status(404).json({ msg: 'Catégorie non trouvée' })
    }

    res.status(200).json({ msg: 'Catégorie supprimée' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

module.exports = {
  addCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
}
