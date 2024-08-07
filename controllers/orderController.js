const Order = require('../models/Order')
const Address = require('../models/Address')

// Passer une commande
const placeOrder = async (req, res) => {
  const { products, shippingAddressId } = req.body

  try {
    const address = await Address.findById(shippingAddressId)
    if (!address || address.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'Invalid address' })
    }

    const totalPrice = products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

    const newOrder = new Order({
      user: req.user.id,
      products,
      totalPrice,
      shippingAddress: address._id,
    })

    await newOrder.save()
    res.json(newOrder)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Obtenir les commandes de l'utilisateur
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('products.product')
      .populate('shippingAddress')
    res.json(orders)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = { placeOrder, getOrders }
