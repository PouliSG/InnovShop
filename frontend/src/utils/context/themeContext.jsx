import React, { createContext, useState, useContext, useEffect } from 'react'
import { getUserSettings, updateUserSettings } from '../../services/apiService'
import { SETTINGS_KEY } from '../constants'

// Create the context
const ThemeContext = createContext()

// Create a custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext)

// Create a provider component
export const ThemeProvider = ({ children, token }) => {
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem(SETTINGS_KEY))
  )
  const [theme, setTheme] = useState('dark') // Default to dark theme

  useEffect(() => {
    const fetchSettings = async () => {
      if (token) {
        try {
          const settings = await getUserSettings(token)
          setTheme(settings.theme || 'dark')
          setSettings(settings)
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
        } catch (error) {
          console.error('Erreur lors de la récupération du thème :', error)
        }
      }
    }
    if (!settings && token) fetchSettings()
  }, [settings, token])

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    settings.theme = newTheme
    setSettings(settings)
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    // Mettre à jour le paramètre utilisateur
    if (token) {
      try {
        await updateUserSettings(token, settings)
      } catch (error) {
        console.error('Erreur lors de la mise à jour du thème :', error)
      }
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
