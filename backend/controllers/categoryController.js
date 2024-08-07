const Category = require('../models/Category')

// Ajouter une catégorie
const addCategory = async (req, res) => {
  const { name, description } = req.body

  try {
    const newCategory = new Category({
      name,
      description,
    })

    const category = await newCategory.save()
    res.json(category)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Obtenir toutes les catégories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Supprimer une catégorie
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id)
    res.json({ msg: 'Category removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = { addCategory, getCategories, deleteCategory }
