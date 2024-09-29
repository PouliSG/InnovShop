import React from 'react'
import { Box, Button } from '@mui/material'

const CheckoutStepConfirm = ({ onPrevious, handleConfirmOrder }) => {
  return (
    <Box>
      <Button variant="contained" onClick={handleConfirmOrder}>
        Confirmer la commande
      </Button>
    </Box>
  )
}

export default CheckoutStepConfirm
