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

    // Vérifier le stock disponible pour chaque produit
    for (const item of cart.products) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          msg: `Le produit ${item.product.name} n'a pas assez de stock`,
        })
      }
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

    // Mettre à jour le stock des produits
    for (const item of cart.products) {
      item.product.stock -= item.quantity
      await item.product.save()
    }

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
      'status paymentStatus products.product shippingAddress'
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
      'user status paymentStatus products.product shippingAddress'
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
      'user status paymentStatus products.product shippingAddress'
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

// Mettre à jour une commande par ID
const updateOrder = async (req, res) => {
  const { id } = req.params
  const { user, products, shippingAddress, status, paymentStatus, totalPrice } =
    req.params
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { user, products, shippingAddress, status, paymentStatus, totalPrice },
      { new: true }
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
  const { id, status } = req.params
  const statusChangedAt = new Date()

  try {
    const order = await Order.findById(id).populate('products.product')

    if (!order) {
      return res.status(404).json({ msg: 'Commande non trouvée' })
    }

    // Mettre à jour le statut de la commande
    order.status = status
    order.statusChangedAt = statusChangedAt

    await order.save()

    // Vérifier si le statut est modifié en 'cancelled' et n'était pas déjà 'cancelled'
    if (status === 'cancelled' && order.status !== 'cancelled') {
      // Incrémenter le stock des produits
      for (const item of order.products) {
        item.product.stock += item.quantity
        await item.product.save()
      }
    }

    res.status(200).json(order)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Mettre à jour le statut de paiement d'une commande
const updatePaymentStatus = async (req, res) => {
  const { id, paymentStatus } = req.params
  const paymentStatusChangedAt = new Date()

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { paymentStatus, paymentStatusChangedAt },
      { new: true }
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

// Supprimer une commande
const deleteOrder = async (req, res) => {
  const { id } = req.params
  try {
    const order = await Order.findById(id).populate('products.product')

    if (!order) {
      return res.status(404).json({ msg: 'Commande non trouvée' })
    }

    await Order.findByIdAndDelete(id)

    // Incrémenter le stock des produits
    for (const item of order.products) {
      item.product.stock += item.quantity
      await item.product.save()
    }
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
  updateOrder,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
  getOrdersByUser,
}
