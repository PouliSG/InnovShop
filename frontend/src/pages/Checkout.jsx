import React, { useState } from 'react'
import { Box, Typography, Divider } from '@mui/material'
import { useTheme as useMUITheme } from '@mui/material/styles'
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

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {activeStep === 1 && 'Récapitulatif de la commande'}
        {activeStep === 2 && 'Adresse de livraison'}
        {activeStep === 3 && 'Confirmation de commande'}
      </Typography>
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
