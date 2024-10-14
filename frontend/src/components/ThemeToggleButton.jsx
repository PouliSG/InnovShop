import React from 'react'
import { useTheme } from '../utils/context/ThemeContext'
import { Button } from '@mui/material'

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme} variant="contained">
      Passer en mode {theme === 'light' ? 'sombre' : 'clair'}
    </Button>
  )
}

export default ThemeToggleButton
