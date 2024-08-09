const Cart = require('../models/Cart')
const Product = require('../models/Product')

// Add item to cart
const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body
  try {
    console.log('product id:', productId)
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' })
    }

    console.log('product:', product)
    console.log('user:', req.user)
    let user_id
    let cart
    if (req.user) {
      cart = await Cart.findOne({ user: req.user.id })
      user_id = req.user.id
    }
    if (!cart) {
      const cart_obj = { products: [] }
      if (user_id) {
        cart_obj.user = user_id
      }
      cart = new Cart(cart_obj)
    }

    console.log('cart:', cart)

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
