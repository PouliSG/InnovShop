import axios from 'axios'
import { API_URL, TOKEN_KEY } from '../utils/constants'

const api = axios.create({
  baseURL: process.env.API_URL,
})

// Intercepter les erreurs des requêtes
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si le token est expiré ou invalide
    if (error.response && error.response.status === 401) {
      // Supprimer le token du localStorage
      localStorage.removeItem(TOKEN_KEY)

      // Retourner une erreur spéciale pour informer de l'expiration de la session
      return Promise.reject({ sessionExpired: true, ...error })
    }
    return Promise.reject(error)
  }
)

export default api

// Gestion des produits
export const getProducts = async (page, sort, filter) => {
  try {
    const response = await api.get(`${API_URL}/products`, {
      params: { page, sort, filter },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getLatestProducts = async () => {
  const response = await api.get(`${API_URL}/products/latest`)
  return response.data
}

export const getFeaturedProducts = async () => {
  const response = await api.get(`${API_URL}/products/featured`)
  return response.data
}

export const getProductById = async (id) => {
  try {
    const response = await api.get(`${API_URL}/products/${id}`)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getProductsByCategory = async (category, page) => {
  try {
    const response = await api.get(`${API_URL}/products/category/${category}`, {
      params: { page },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Gestion des catégories
export const getCategories = async () => {
  try {
    const response = await api.get(`${API_URL}/categories`)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Gestion des utilisateurs
export const getUserProfile = async (token) => {
  try {
    const response = await api.get(`${API_URL}/users/profile`, {
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
    const response = await api.get(`${API_URL}/users/${user_id}`, {
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
    const response = await api.post(
      `${API_URL}/cart`,
      { productId, quantity }, // Données à envoyer dans le corps de la requête
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authentification via token
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error)
    throw error
  }
}

// Récupérer le panier de l'utilisateur
export const getCart = async (token) => {
  try {
    const response = await api.get(`${API_URL}/cart`, {
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
    const response = await api.put(
      `${API_URL}/cart/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authentification via token
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Erreur lors de la suppression du panier:', error)
    throw error
  }
}

// Sauvegarder le panier (pour les utilisateurs connectés)
export const saveCart = async (token, products) => {
  try {
    const response = await api.post(
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

export const placeOrder = async (token, cartId, shippingAddressId) => {
  try {
    const response = await api.post(
      `${API_URL}/orders`,
      {
        cartId,
        shippingAddressId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Erreur lors de la commande :', error)
    throw error.response.data || error.message
  }
}

// Récupérer les addresses d'un utilisateur
export const getAddressesByUser = async (token, userId) => {
  try {
    const response = await api.get(`${API_URL}/addresses/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Récupérer les adresses de l'utilisateur
export const getUserAddresses = async (token) => {
  try {
    const response = await api.get(`${API_URL}/users/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Ajouter une nouvelle adresse
export const addUserAddress = async (token, addressData) => {
  try {
    const response = await api.post(`${API_URL}/users/address`, addressData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Ajouter un utilisateur
export const addUser = async (token, userData) => {
  try {
    const response = await api.post(`${API_URL}/users`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    throw error.response.data
  }
}

// Mettre à jour une adresse existante
export const updateAddress = async (token, addressId, addressData) => {
  try {
    const response = await api.put(
      `${API_URL}/users/address/${addressId}`,
      addressData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Supprimer une adresse
export const deleteAddress = async (token, addressId) => {
  try {
    const response = await api.delete(`${API_URL}/users/address/${addressId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Admin

// Récupérer toutes les commandes
export const getOrders = async (token) => {
  try {
    const response = await api.get(`${API_URL}/orders/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Récupérer une commande par ID
export const getOrderById = async (token, orderId) => {
  try {
    const response = await api.get(`${API_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Mettre à jour une commande
export const updateOrder = async (token, orderId, orderData) => {
  try {
    const response = await api.put(`${API_URL}/orders/${orderId}`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Mettre à jour le statut d'une commande
export const updateOrderStatus = async (token, orderId, status) => {
  try {
    const response = await api.put(
      `${API_URL}/orders/${orderId}/status/${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Mettre à jour le statut du paiement d'une commande
export const updatePaymentStatus = async (token, orderId, status) => {
  try {
    const response = await api.put(
      `${API_URL}/orders/${orderId}/payment/${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Supprimer une commande
export const deleteOrder = async (token, orderId) => {
  try {
    const response = await api.delete(`${API_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Supprimer des commandes
export const deleteOrders = async (token, orderIds) => {
  try {
    var responses = []
    orderIds.forEach(async (orderId) => {
      const response = await api.delete(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      responses.push(response.data)
    })
    return responses
  } catch (error) {
    throw error.response.data
  }
}

// Récupérer tous les utilisateurs
export const getUsers = async (token) => {
  try {
    const response = await api.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Récupérer un utilisateur par ID
export const getUserById = async (token, userId) => {
  try {
    const response = await api.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Réinitialiser le mot de passe d'un utilisateur
export const resetUserPassword = async (token, userId) => {
  try {
    const response = await api.put(
      `${API_URL}/users/${userId}/reset-password`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Mettre à jour le rôle d'un utilisateur
export const updateUserRole = async (token, userId, role) => {
  try {
    const response = await api.put(
      `${API_URL}/users/${userId}`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Mettre à jour les paramètres d'un utilisateur
export const updateUserSettings = async (token, userId, settings) => {
  try {
    const response = await api.put(
      `${API_URL}/users/${userId}/settings`,
      { settings },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Mettre à jour le profil d'un utilisateur
export const updateUserProfile = async (token, userData) => {
  try {
    const response = await api.put(`${API_URL}/users/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Mettre à jour un utilisateur
export const updateUser = async (token, userId, userData) => {
  try {
    const response = await api.put(`${API_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Supprimer un utilisateur
export const deleteUser = async (token, userId) => {
  try {
    const response = await api.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Ajouter une catégorie
export const addCategory = async (token, catData) => {
  try {
    const response = await api.post(`${API_URL}/categories`, catData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Obtenir une catégorie par ID
export const getCategoryById = async (categoryId) => {
  try {
    const response = await api.get(`${API_URL}/categories/${categoryId}`)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Supprimer une catégorie
export const deleteCategory = async (token, categoryId) => {
  try {
    const response = await api.delete(`${API_URL}/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Supprimer des catégories
export const deleteCategories = async (token, categoryIds) => {
  try {
    var responses = []
    categoryIds.forEach(async (categoryId) => {
      const response = await api.delete(`${API_URL}/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      responses.push(response.data)
    })
    return responses
  } catch (error) {
    throw error.response.data
  }
}

// Mettre à jour une catégorie
export const updateCategory = async (token, categoryId, name) => {
  try {
    const response = await api.put(
      `${API_URL}/categories/${categoryId}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Supprimer un produit
export const deleteProduct = async (token, productId) => {
  try {
    const response = await api.delete(`${API_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Supprimer des produits
export const deleteProducts = async (token, productIds) => {
  try {
    var responses = []
    productIds.forEach(async (productId) => {
      const response = await api.delete(`${API_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      responses.push(response.data)
    })
    return responses
  } catch (error) {
    throw error.response.data
  }
}

// Mettre à jour un produit
export const updateProduct = async (token, productId, productData) => {
  try {
    const response = await api.put(
      `${API_URL}/products/${productId}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Ajouter un produit
export const addProduct = async (token, productData) => {
  try {
    const response = await api.post(`${API_URL}/products`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}
