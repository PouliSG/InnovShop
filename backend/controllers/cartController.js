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
      cart = new Cart({ user: req.user.id, items: [] })
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    )
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity })
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
      'items.product'
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
  const { productId } = req.body
  try {
    let cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' })
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    )
    await cart.save()
    res.status(200).json(cart)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = {
  addItemToCart,
  getCart,
  removeItemFromCart,
}
