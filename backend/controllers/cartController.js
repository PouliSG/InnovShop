const Cart = require('../models/Cart')
const Product = require('../models/Product')

// Add item to cart
const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body
  try {
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' })
    }

    let cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      cart = new Cart({ user: req.user.id, products: [] })
    }

    const productIndex = cart.products.findIndex(
      (product) => product.id === productId
    )
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity
    } else {
      cart.products.push({ product: productId, quantity })
    }

    await cart.save()
    res.status(200).json(cart)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Get cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      'products.product'
    )
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' })
    }
    res.status(200).json(cart)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  const { id } = req.params
  try {
    let cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' })
    }

    console.log('cart products', cart.products)
    console.log('id', id)

    cart.products = cart.products.filter((product) => product.id !== id)
    await cart.save()
    res.status(200).json(cart)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Enregistrer le panier
const saveCart = async (req, res) => {
  const { products } = req.body

  try {
    // Vérifier si un panier existe déjà pour l'utilisateur
    let cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      // Si le panier n'existe pas, créer un nouveau panier
      cart = new Cart({
        user: req.user.id,
        products: products,
      })
    } else {
      // Si le panier existe, mettre à jour les articles
      cart.products = products
    }

    // Sauvegarder le panier
    await cart.save()
    res.status(200).json({ message: 'Panier sauvegardé avec succès', cart })
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
