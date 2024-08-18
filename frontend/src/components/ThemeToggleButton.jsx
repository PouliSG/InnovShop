import React from 'react'
import { useTheme } from '../utils/context'

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      Passer en mode {theme === 'light' ? 'sombre' : 'clair'}
    </button>
  )
}

export default ThemeToggleButton
