import React, { useContext } from 'react'
import { CartContext } from '../utils/context/cartContext'
import { placeOrder } from '../services/apiService'
import { Box, Typography, Button } from '@mui/material'

const CheckoutStepConfirm = ({ orderDetails, onPrevious }) => {
  const { cart, clearCart } = useContext(CartContext)

  const handleConfirmOrder = async () => {
    try {
      await placeOrder({
        products: cart.products,
        addressId: orderDetails.selectedAddressId,
      })
      clearCart()
      // Redirection vers page de confirmation
    } catch (error) {
      console.error('Erreur lors de la commande', error)
    }
  }

  return (
    <Box>
      <Typography variant="h5">Confirmation de la commande</Typography>
      {/* Détails de la commande */}
      <Button onClick={onPrevious}>Retour</Button>
      <Button variant="contained" onClick={handleConfirmOrder}>
        Confirmer la commande
      </Button>
    </Box>
  )
}

export default CheckoutStepConfirm
