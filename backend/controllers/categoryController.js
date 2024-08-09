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

// Update category
const updateCategory = async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body
  try {
    let category = await Category.findById(id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    category.name = name || category.name
    category.description = description || category.description

    await category.save()
    res.json(category)
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

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
}
