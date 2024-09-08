const Product = require('../models/Product')

// Ajouter un produit
const addProduct = async (req, res) => {
  const { name, description, price, category, stock, featured, image } =
    req.body
  try {
    // Création d'un nouveau produit
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      featured,
      image,
    })

    await product.save()
    res.status(201).json(product)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Obtenir tous les produits
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category')
    res.status(200).json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Mettre à jour un produit
const updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, price, category, stock, featured, image } =
    req.body

  try {
    // Mise à jour du produit existant
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, stock, featured, image },
      { new: true }
    )

    if (!product) {
      return res.status(404).json({ msg: 'Produit non trouvé' })
    }

    res.status(200).json(product)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Supprimer un produit
const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res.status(404).json({ msg: 'Produit non trouvé' })
    }

    res.status(200).json({ msg: 'Produit supprimé' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Récupérer les derniers produits ajoutés
const getLatestProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(3)
    res.status(200).json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Récupérer les produits à la une
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(3)
    res.status(200).json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getLatestProducts,
  getFeaturedProducts,
}
