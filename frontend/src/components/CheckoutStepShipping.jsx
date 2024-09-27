import React, { useEffect, useState } from 'react'
import {
  getUserAddresses,
  addUserAddress,
  updateAddress,
} from '../services/apiService'
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

const CheckoutStepShipping = ({
  onNext,
  onPrevious,
  updateOrderDetails,
  orderDetails,
}) => {
  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(
    orderDetails.selectedAddressId || ''
  )
  const [newAddress, setNewAddress] = useState({
    label: '',
    number: '',
    street: '',
    city: '',
    additional: '',
    zip: '',
    country: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userAddresses = await getUserAddresses()
        setAddresses(userAddresses)
      } catch (error) {
        console.error('Erreur lors du chargement des adresses', error)
      }
    }
    fetchAddresses()
  }, [])

  const handleAddressSelection = (e) => {
    const addressId = e.target.value
    setSelectedAddressId(addressId)
    if (addressId === 'new') {
      setIsEditing(true)
      setNewAddress({
        label: '',
        number: '',
        street: '',
        additional: '',
        city: '',
        zip: '',
        country: '',
      })
    } else {
      const selectedAddress = addresses.find((addr) => addr._id === addressId)
      setNewAddress(selectedAddress)
      setIsEditing(false)
    }
  }

  const handleSaveAddress = async () => {
    if (isEditing) {
      if (selectedAddressId === 'new') {
        await addUserAddress(newAddress)
      } else {
        await updateAddress(selectedAddressId, newAddress)
      }
    } else {
      setShowConfirmDialog(true)
    }
    updateOrderDetails({ selectedAddressId })
    onNext()
  }

  const handleConfirmDialogClose = () => {
    setShowConfirmDialog(false)
  }

  return (
    <Box>
      <Typography variant="h5">Adresse de livraison</Typography>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Adresse</InputLabel>
        <Select value={selectedAddressId} onChange={handleAddressSelection}>
          <MenuItem value="new">Ajouter une nouvelle adresse</MenuItem>
          {addresses.map((addr) => (
            <MenuItem key={addr._id} value={addr._id}>
              {addr.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedAddressId === 'new' && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Numéro"
            fullWidth
            value={newAddress.number}
            onChange={(e) =>
              setNewAddress({ ...newAddress, number: e.target.value })
            }
          />
          <TextField
            label="Rue"
            fullWidth
            value={newAddress.street}
            onChange={(e) =>
              setNewAddress({ ...newAddress, street: e.target.value })
            }
          />
          <TextField
            label="Complément d'adresse"
            fullWidth
            value={newAddress.street}
            onChange={(e) =>
              setNewAddress({ ...newAddress, additional: e.target.value })
            }
          />
          <TextField
            label="Ville"
            fullWidth
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
          />
          <TextField
            label="Code postal"
            fullWidth
            value={newAddress.zip}
            onChange={(e) =>
              setNewAddress({ ...newAddress, zip: e.target.value })
            }
          />
          <TextField
            label="Pays"
            fullWidth
            value={newAddress.country}
            onChange={(e) =>
              setNewAddress({ ...newAddress, country: e.target.value })
            }
          />
        </Box>
      )}

      <Button onClick={onPrevious}>Retour</Button>
      <Button onClick={handleSaveAddress}>Continuer</Button>

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
          <Button onClick={handleConfirmDialogClose}>Annuler</Button>
          <Button
            onClick={() => {
              setShowConfirmDialog(false)
              onNext()
            }}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CheckoutStepShipping
