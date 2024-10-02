import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { useTheme as useMUITheme } from '@mui/material/styles'
import NextIcon from '@mui/icons-material/NavigateNext'
import PreviousIcon from '@mui/icons-material/NavigateBefore'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'
import { CartContext } from '../utils/context/cartContext'
import {
  addUserAddress,
  updateAddress,
  placeOrder,
} from '../services/apiService'
import CheckoutStepSummary from '../components/CheckoutStepSummary'
import CheckoutStepShipping from '../components/CheckoutStepShipping'
import CheckoutStepConfirm from '../components/CheckoutStepConfirm'
import { TOKEN_KEY } from '../utils/constants'

const Checkout = ({ handleSessionExpiration }) => {
  const token = localStorage.getItem(TOKEN_KEY)
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(1)
  const [orderDetails, setOrderDetails] = useState({
    address: '',
    paymentMethod: '',
    selectedAddressId: '',
  })
  const [selectedAddressId, setSelectedAddressId] = useState(
    orderDetails.selectedAddressId || ''
  )
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [newAddress, setNewAddress] = useState({
    label: '',
    number: '',
    street: '',
    city: '',
    additional: '',
    zip: '',
    country: '',
  })
  const { cart, clearCart } = useContext(CartContext)
  const muiTheme = useMUITheme()

  // Fonction pour passer à l'étape suivante
  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1)
    setShowConfirmDialog(false)
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

  const handleConfirmDialogClose = () => {
    setShowConfirmDialog(false)
  }

  const handleConfirmOrder = async () => {
    try {
      await placeOrder(token, cart._id, orderDetails.selectedAddressId)
      clearCart()
      // Redirection vers page de confirmation
      navigate('/order-confirmation')
    } catch (error) {
      if (error.sessionExpired) {
        handleSessionExpiration() // Gérer la session expirée
      } else {
        console.error('Erreur lors de la commande', error)
      }
    }
  }

  const handleSaveAddress = async () => {
    if (isEditing) {
      try {
        if (selectedAddressId === 'new') {
          const savedAddress = await addUserAddress(token, newAddress)
          setSelectedAddressId(savedAddress._id)
        } else {
          await updateAddress(token, selectedAddressId, newAddress)
        }
      } catch (error) {
        if (error.sessionExpired) {
          handleSessionExpiration() // Gérer la session expirée
        } else {
          console.error("Erreur lors de la sauvegarde de l'adresse", error)
        }
      }
    } else {
      setShowConfirmDialog(true)
    }
    handleNextStep()
  }

  useEffect(() => {
    if (selectedAddressId !== '' && selectedAddressId !== 'new') {
      updateOrderDetails({ selectedAddressId })
    }
  }, [selectedAddressId])

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {activeStep > 1 && (
          <Button
            variant="contained"
            onClick={handlePreviousStep}
            color="primary"
            startIcon={<PreviousIcon />}
            sx={{
              height: 50,
              color: muiTheme.palette.text.secondary,
              '&:hover': {
                color: muiTheme.palette.text.secondary, // Change text color on hover
              },
              '& .MuiButton-startIcon': {
                color: muiTheme.palette.text.secondary, // Color of the icon
              },
              '&:hover .MuiButton-startIcon': {
                color: muiTheme.palette.text.secondary, // Icon color on hover
              },
            }}
          >
            Retour
          </Button>
        )}
        <Typography variant="h4" gutterBottom>
          {activeStep === 1 && 'Récapitulatif de la commande'}
          {activeStep === 2 && 'Adresse de livraison'}
          {activeStep === 3 && 'Confirmation de commande'}
        </Typography>
        {activeStep === 1 && (
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
        )}
        {activeStep === 2 && (
          <Button
            variant="contained"
            onClick={handleSaveAddress}
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
        )}
        {activeStep === 3 && (
          <Button
            variant="contained"
            onClick={handleConfirmOrder}
            color="primary"
            endIcon={<CheckIcon />}
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
            Confirmer la commande
          </Button>
        )}
      </Box>
      <Divider sx={{ mb: 1 }} />

      {/* Étapes du checkout */}
      {activeStep === 1 && <CheckoutStepSummary muiTheme={muiTheme} />}
      {activeStep === 2 && (
        <CheckoutStepShipping
          setIsEditing={setIsEditing}
          selectedAddressId={selectedAddressId}
          setSelectedAddressId={setSelectedAddressId}
          setNewAddress={setNewAddress}
          newAddress={newAddress}
        />
      )}
      {activeStep === 3 && <CheckoutStepConfirm />}

      <Divider sx={{ m: 2 }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {activeStep > 1 ? (
          <Button
            variant="contained"
            onClick={handlePreviousStep}
            color="primary"
            startIcon={<PreviousIcon />}
            sx={{
              height: 50,
              color: muiTheme.palette.text.secondary,
              '&:hover': {
                color: muiTheme.palette.text.secondary, // Change text color on hover
              },
              '& .MuiButton-startIcon': {
                color: muiTheme.palette.text.secondary, // Color of the icon
              },
              '&:hover .MuiButton-startIcon': {
                color: muiTheme.palette.text.secondary, // Icon color on hover
              },
            }}
          >
            Retour
          </Button>
        ) : (
          <Box sx={{ width: 100 }} />
        )}
        {activeStep === 1 && (
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
        )}
        {activeStep === 2 && (
          <Button
            variant="contained"
            onClick={handleSaveAddress}
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
        )}
        {activeStep === 3 && (
          <Button
            variant="contained"
            onClick={handleConfirmOrder}
            color="primary"
            endIcon={<CheckIcon />}
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
            Confirmer la commande
          </Button>
        )}
      </Box>

      {/* Alerte pour confirmer sans sauvegarde */}
      <Dialog open={showConfirmDialog} onClose={handleConfirmDialogClose}>
        <DialogTitle>Confirmer sans sauvegarde</DialogTitle>
        <DialogContent>
          <Typography>
            Souhaitez-vous continuer sans sauvegarder les modifications de
            l'adresse ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmDialogClose}
            variant="contained"
            color="primary"
            startIcon={<CancelIcon />}
            sx={{
              height: 50,
              color: muiTheme.palette.text.primary,
              '&:hover': {
                color: muiTheme.palette.text.secondary, // Change text color on hover
              },
              '& .MuiButton-startIcon': {
                color: muiTheme.palette.text.primary,
              },
              '&:hover .MuiButton-startIcon': {
                color: muiTheme.palette.text.secondary, // Change text color on hover
              },
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleNextStep}
            variant="contained"
            color="primary"
            startIcon={<CheckIcon />}
            sx={{
              height: 50,
              color: muiTheme.palette.text.primary,
              '&:hover': {
                color: muiTheme.palette.text.secondary, // Change text color on hover
              },
              '& .MuiButton-startIcon': {
                color: muiTheme.palette.text.primary, // Change text color on hover
              },
              '&:hover .MuiButton-startIcon': {
                color: muiTheme.palette.text.secondary, // Change text color on hover
              },
            }}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Checkout
