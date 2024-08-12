const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Address = require('../models/Address')

// Passer une commande
const placeOrder = async (req, res) => {
  const { cartId, shippingAddressId } = req.body

  try {
    // Récupérer le panier et l'adresse de livraison
    const cart = await Cart.findById(cartId).populate('products.product')
    const shippingAddress = await Address.findById(shippingAddressId)

    if (!cart || !shippingAddress) {
      return res
        .status(404)
        .json({ msg: 'Panier ou adresse de livraison non trouvés' })
    }

    // Créer une nouvelle commande
    const order = new Order({
      user: req.user.id,
      products: cart.products,
      shippingAddress: shippingAddress._id,
      totalPrice: cart.products.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
    })

    await order.save()

    // Vider le panier après la commande
    cart.products = []
    await cart.save()

    res.status(201).json(order)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Obtenir les commandes de l'utilisateur
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      'products.product shippingAddress'
    )
    res.status(200).json(orders)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Obtenir toutes les commandes (pour les employés et admins)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate(
      'user products.product shippingAddress'
    )
    res.status(200).json(orders)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Obtenir une commande par ID
const getOrderById = async (req, res) => {
  const { id } = req.params
  try {
    const order = await Order.findById(id).populate(
      'user products.product shippingAddress'
    )
    if (!order) {
      return res.status(404).json({ msg: 'Commande non trouvée' })
    }
    res.status(200).json(order)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Mettre à jour le statut d'une commande
const updateOrderStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })

    if (!order) {
      return res.status(404).json({ msg: 'Commande non trouvée' })
    }

    res.status(200).json(order)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Supprimer une commande
const deleteOrder = async (req, res) => {
  const { id } = req.params
  try {
    await Order.findByIdAndDelete(id)
    res.json({ message: 'Commande supprimée' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Obtenir les commandes d'un utilisateur (pour employés et admins)
const getOrdersByUser = async (req, res) => {
  const { id } = req.params
  try {
    const orders = await Order.find({ user: id }).populate('products.product')
    res.status(200).json(orders)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrdersByUser,
}
