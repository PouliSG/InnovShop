import React, { useState, useContext } from 'react'
import { Box, Typography, Divider, Button } from '@mui/material'
import { useTheme as useMUITheme } from '@mui/material/styles'
import NextIcon from '@mui/icons-material/NavigateNext'
import { CartContext } from '../utils/context/cartContext'
import { placeOrder } from '../services/apiService'
import CheckoutStepSummary from '../components/CheckoutStepSummary'
import CheckoutStepShipping from '../components/CheckoutStepShipping'
import CheckoutStepConfirm from '../components/CheckoutStepConfirm'

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [orderDetails, setOrderDetails] = useState({
    address: '',
    paymentMethod: '',
    selectedAddressId: '',
  })
  const { cart, clearCart } = useContext(CartContext)
  const muiTheme = useMUITheme()

  // Fonction pour passer à l'étape suivante
  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  // Fonction pour revenir à l'étape précédente
  const handlePreviousStep = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  // Gestion des changements d'adresse et de méthode de paiement
  const updateOrderDetails = (newDetails) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      ...newDetails,
    }))
  }

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
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {activeStep === 1 && 'Récapitulatif de la commande'}
          {activeStep === 2 && 'Adresse de livraison'}
          {activeStep === 3 && 'Confirmation de commande'}
        </Typography>
        {activeStep < 3 ? (
          <Button
            variant="contained"
            onClick={handleNextStep}
            color="primary"
            endIcon={<NextIcon />}
            sx={{
              height: 50,
              color: muiTheme.palette.text.secondary,
              '&:hover': {
                color: muiTheme.palette.text.secondary, // Change text color on hover
              },
              '& .MuiButton-endIcon': {
                color: muiTheme.palette.text.secondary, // Color of the icon
              },
              '&:hover .MuiButton-endIcon': {
                color: muiTheme.palette.text.secondary, // Icon color on hover
              },
            }}
          >
            Continuer
          </Button>
        ) : (
          <Button variant="contained" onClick={handleConfirmOrder}>
            Confirmer la commande
          </Button>
        )}
      </Box>
      <Divider sx={{ mb: 4 }} />

      {/* Étapes du checkout */}
      {activeStep === 1 && (
        <CheckoutStepSummary muiTheme={muiTheme} onNext={handleNextStep} />
      )}
      {activeStep === 2 && (
        <CheckoutStepShipping
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
          updateOrderDetails={updateOrderDetails}
          orderDetails={orderDetails}
        />
      )}
      {activeStep === 3 && (
        <CheckoutStepConfirm
          orderDetails={orderDetails}
          onPrevious={handlePreviousStep}
        />
      )}
    </Box>
  )
}

export default Checkout
