import React, { createContext, useState, useEffect } from 'react'
import {
  addItemToCart,
  removeItemFromCart,
  getCart,
  saveCart,
} from '../../services/apiService'
import { isAuthenticated } from '../../services/authService'
import { TOKEN_KEY } from '../../constants'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    products: [],
  })
  const token = localStorage.getItem(TOKEN_KEY)

  // Charger le panier depuis le localStorage ou l'API si l'utilisateur est connecté
  useEffect(() => {
    const loadCart = async () => {
      const localCart = JSON.parse(localStorage.getItem('cart')) || {
        products: [],
      }
      if (isAuthenticated()) {
        try {
          const userCart = await getCart(token)
          setCart(userCart)
          localStorage.setItem('cart', JSON.stringify(userCart))
        } catch (error) {
          console.error('Erreur lors de la récupération du panier:', error)
          setCart(localCart)
        }
      } else {
        setCart(localCart)
      }
    }
    loadCart()
  }, [token])

  // Ajouter un produit au panier
  const addToCart = (product, quantity) => {
    const updatedCart = { ...cart }
    const productIndex = updatedCart.products.findIndex(
      (p) => p.product._id === product._id
    )

    if (productIndex > -1) {
      // Si le produit est déjà dans le panier, on met à jour la quantité
      updatedCart.products[productIndex].quantity += quantity
    } else {
      // Sinon, on ajoute le produit au panier
      updatedCart.products.push({ product, quantity })
    }

    setCart(updatedCart)

    if (isAuthenticated()) {
      // Si l'utilisateur est connecté, on sauvegarde le panier sur le backend
      saveCart(token, updatedCart.products)
    }
    //on sauvegarde le panier dans le localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    const updatedCart = { ...cart }
    updatedCart.products = updatedCart.products.filter(
      (p) => p.product._id !== productId
    )

    setCart(updatedCart)

    if (isAuthenticated()) {
      // Si l'utilisateur est connecté, on sauvegarde le panier mis à jour sur le backend
      saveCart(token, updatedCart.products)
    }
    // Sinon, on sauvegarde le panier dans le localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
