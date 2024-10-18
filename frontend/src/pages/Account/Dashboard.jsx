import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { isAuthenticated } from '../../services/authService'

function Dashboard({ handleSessionExpiration, handleUnauthorizedAccess }) {
  const navigate = useNavigate()
  const handleUnauthenticated = () => {
    handleSessionExpiration() // Close the modal after login
    navigate('/')
  }

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated()) {
      handleUnauthenticated() // Open login modal if not authenticated
    }
  }, [isAuthenticated()])

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
