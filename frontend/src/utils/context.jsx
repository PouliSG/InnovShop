import React, { createContext, useState, useContext } from 'react'

// Create the context
const ThemeContext = createContext()

// Create a custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext)

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light') // Default to light theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
