import axios from 'axios'
import { API_URL } from '../constants'

// Gestion des produits
export const getProducts = async (page, sort, filter) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: { page, sort, filter },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getLatestProducts = async () => {
  const response = await axios.get(`${API_URL}/products/latest`)
  return response.data
}

export const getFeaturedProducts = async () => {
  const response = await axios.get(`${API_URL}/products/featured`)
  return response.data
}

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getProductsByCategory = async (category, page) => {
  try {
    const response = await axios.get(
      `${API_URL}/products/category/${category}`,
      {
        params: { page },
      }
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const createProduct = async (productData, token) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Gestion des catégories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Gestion des utilisateurs
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getUserRole = async (token) => {
  try {
    var user_id = JSON.parse(atob(token.split('.')[1])).id
    const response = await axios.get(`${API_URL}/users/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

/* Gestion du panier (utilisateur authentifié) */
// Ajouter un produit au panier (pour les utilisateurs connectés)
export const addItemToCart = async (token, productId, quantity) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      productId,
      quantity,
    })
    return response.data
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error)
    throw error
  }
}

// Récupérer le panier de l'utilisateur
export const getCart = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error)
    throw error
  }
}

// Supprimer un produit du panier
export const removeItemFromCart = async (token, productId) => {
  try {
    const response = await axios.put(`${API_URL}/cart/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Erreur lors de la suppression du panier:', error)
    throw error
  }
}

// Sauvegarder le panier (pour les utilisateurs connectés)
export const saveCart = async (token, products) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart/save`,
      { products }, // Données à envoyer dans le corps de la requête
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authentification via token
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du panier:', error)
    throw error
  }
}
