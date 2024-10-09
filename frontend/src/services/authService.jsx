import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { API_URL, TOKEN_KEY } from '../utils/constants'

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      token,
      password,
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

// Fonction pour déconnecter l'utilisateur
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
}

// Fonction pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return false

  try {
    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem(TOKEN_KEY)
      return false
    }
    return true
  } catch (error) {
    console.error('Erreur lors du décodage du token:', error)
    return false
  }
}
