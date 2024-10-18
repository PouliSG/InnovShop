import React, { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../services/authService'

const OrderConfirmation = ({ handleSessionExpiration }) => {
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
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Votre commande a été passée avec succès !
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Nous vous remercions pour votre achat. Vous recevrez bientôt un email de
        confirmation avec les détails de votre commande.
      </Typography>
      <Button
        component={Link}
        to="/products"
        variant="contained"
        color="primary"
      >
        Continuer vos achats
      </Button>
    </Box>
  )
}

export default OrderConfirmation
