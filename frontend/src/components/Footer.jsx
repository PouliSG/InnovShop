import React from 'react'
import { Box, Typography } from '@mui/material'
import ThemeToggleButton from './ThemeToggleButton'

const Footer = () => {
  return (
    <Box
      component="footer"
      p={2}
      textAlign="center"
      bgcolor="background.default"
    >
      <Typography variant="body2">
        © 2024 InnovShop. Tous droits réservés.
      </Typography>
      <ThemeToggleButton />
    </Box>
  )
}

export default Footer
