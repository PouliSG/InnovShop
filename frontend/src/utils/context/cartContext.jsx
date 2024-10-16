import React, { createContext, useState, useEffect } from 'react'
import { getCart, saveCart } from '../../services/apiService'
import { isAuthenticated } from '../../services/authService'
import { TOKEN_KEY } from '../constants'
import { useSessionManager } from '../hooks/useSessionManager'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    products: [],
  })
  // Récupérer le token depuis le localStorage
  const token = localStorage.getItem(TOKEN_KEY)

  // Quantité totale dans le panier (pour le badge de notification)
  const [totalQuantity, setTotalQuantity] = useState(0)

  // Utiliser le hook pour gérer la session
  const { handleSessionExpired } = useSessionManager()

  // Charger le panier depuis le localStorage ou l'API si l'utilisateur est connecté
  useEffect(() => {
    const loadCart = async () => {
      const localCart = JSON.parse(localStorage.getItem('cart'))
      if (isAuthenticated()) {
        try {
          const userCart = await getCart(token)
          setCart(userCart)
        } catch (error) {
          if (error.sessionExpired) {
            handleSessionExpired() // Gérer la session expirée
          } else {
            console.error('Erreur lors de la récupération du panier:', error)
          }
          setCart({ products: [] })
        }
      } else {
        // Si l'utilisateur n'est pas connecté, on charge le panier depuis le localStorage
        localCart ? setCart(localCart) : setCart({ products: [] })
      }
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    loadCart()
  }, [token, handleSessionExpired])

  // Calculer la quantité totale des produits dans le panier
  useEffect(() => {
    const total = cart.products.reduce((acc, item) => acc + item.quantity, 0)
    setTotalQuantity(total)
  }, [cart])

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
      try {
        saveCart(token, updatedCart.products)
      } catch (error) {
        if (error.sessionExpired) {
          handleSessionExpired() // Gérer la session expirée
        } else {
          console.error('Erreur lors de la sauvegarde du panier:', error)
        }
      }
    }
    // On sauvegarde le panier dans le localStorage
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
      try {
        saveCart(token, updatedCart.products)
      } catch (error) {
        if (error.sessionExpired) {
          handleSessionExpired() // Gérer la session expirée
        } else {
          console.error('Erreur lors de la sauvegarde du panier:', error)
        }
      }
    }
    // On sauvegarde le panier dans le localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  // Mettre à jour la quantité d'un produit dans le panier
  // Ajouter cette méthode dans le CartContext.jsx
  const updateCartItemQuantity = (productId, newQuantity) => {
    const updatedCart = { ...cart }
    const productIndex = updatedCart.products.findIndex(
      (p) => p.product._id === productId
    )

    if (productIndex > -1) {
      updatedCart.products[productIndex].quantity = newQuantity
      setCart(updatedCart)

      if (isAuthenticated()) {
        try {
          saveCart(token, updatedCart.products)
        } catch (error) {
          if (error.sessionExpired) {
            handleSessionExpired() // Gérer la session expirée
          } else {
            console.error('Erreur lors de la sauvegarde du panier:', error)
          }
        }
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
  }

  // Vider le panier
  const clearCart = () => {
    cart.products = []
    setCart(cart)
    setTotalQuantity(0)

    if (isAuthenticated()) {
      saveCart(token, cart.products)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
