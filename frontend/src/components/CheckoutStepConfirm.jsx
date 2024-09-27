import React, { useContext } from 'react'
import { CartContext } from '../utils/context/cartContext'
import { Box, Button } from '@mui/material'

const CheckoutStepConfirm = ({
  orderDetails,
  onPrevious,
  handleConfirmOrder,
}) => {
  return (
    <Box>
      <Button onClick={onPrevious}>Retour</Button>
      <Button variant="contained" onClick={handleConfirmOrder}>
        Confirmer la commande
      </Button>
    </Box>
  )
}

export default CheckoutStepConfirm
