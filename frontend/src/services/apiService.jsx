import axios from 'axios'
import { API_URL } from '../constants'

// Gestion des produits
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`)
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

export const getLatestProducts = async () => {
  const response = await axios.get(`${API_URL}/products/latest`)
  return response.data
}

export const getFeaturedProducts = async () => {
  const response = await axios.get(`${API_URL}/products/featured`)
  return response.data
}
