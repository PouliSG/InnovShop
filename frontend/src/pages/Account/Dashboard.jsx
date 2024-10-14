import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import ThemeToggleButton from '../../components/ThemeToggleButton'
import { isAuthenticated } from '../../services/authService'

function Dashboard({ handleUnauthorizedAccess }) {
  if (!isAuthenticated()) {
    handleUnauthorizedAccess()
    return <Navigate to="/" />
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mon compte
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'begin',
        }}
      >
        <Button
          component={Link}
          to="/account/profile"
          variant="contained"
          sx={{ mr: 2 }}
        >
          Mes informations
        </Button>
        <Button
          component={Link}
          to="/account/orders"
          variant="contained"
          sx={{ mr: 2 }}
        >
          Mes commandes
        </Button>
        <Button
          component={Link}
          to="/account/addresses"
          variant="contained"
          sx={{ mr: 2 }}
        >
          Mes adresses
        </Button>
        <Button
          component={Link}
          to="/account/settings"
          variant="contained"
          sx={{ mr: 2 }}
        >
          Mes paramètres
        </Button>
      </Box>
    </Box>
  )
}

export default Dashboard
