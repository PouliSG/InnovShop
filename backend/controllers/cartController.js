const Cart = require('../models/Cart')
const Product = require('../models/Product')

// Ajouter un article au panier
const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body
  try {
    // Recherche du produit par ID
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ msg: 'Produit non trouvé' })
    }

    // Recherche du panier de l'utilisateur
    let cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      // Création d'un nouveau panier si l'utilisateur n'en a pas encore
      cart = new Cart({ user: req.user.id, products: [] })
    }

    // Vérification si le produit est déjà dans le panier
    const productIndex = cart.products.findIndex(
      (product) => product.id === productId
    )
    if (productIndex > -1) {
      // Mise à jour de la quantité si le produit est déjà dans le panier
      cart.products[productIndex].quantity += quantity
    } else {
      // Ajout du produit au panier
      cart.products.push({ product: productId, quantity })
    }

    // Sauvegarde du panier
    await cart.save()
    res.status(200).json(cart)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Obtenir le panier de l'utilisateur
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      'products.product'
    )
    if (!cart) {
      return res.status(404).json({ msg: 'Panier non trouvé' })
    }
    res.status(200).json(cart)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Supprimer un article du panier
const removeItemFromCart = async (req, res) => {
  const { id } = req.params
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      return res.status(404).json({ msg: 'Panier non trouvé' })
    }

    // Suppression du produit du panier
    cart.products = cart.products.filter((product) => product.id !== id)

    await cart.save()
    res.status(200).json(cart)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Sauvegarder le panier
const saveCart = async (req, res) => {
  const { products } = req.body

  try {
    // Mise à jour ou création du panier de l'utilisateur
    let cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { products },
      { new: true, upsert: true }
    )

    res.status(200).json(cart)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Supprimer le panier
const deleteCart = async (req, res) => {
  try {
    // Trouver et supprimer le panier
    await Cart.findOneAndDelete({ user: req.user.id })
    res.status(200).json({ message: 'Panier supprimé avec succès' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Supprimer le panier de l'utilisateur
const deleteCartUser = async (req, res) => {
  const { userId } = req.params
  try {
    // Trouver et supprimer le panier
    await Cart.findOneAndDelete({ user: userId })
    res.status(200).json({ message: 'Panier supprimé avec succès' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

module.exports = {
  addItemToCart,
  getCart,
  removeItemFromCart,
  saveCart,
  deleteCart,
  deleteCartUser,
}
