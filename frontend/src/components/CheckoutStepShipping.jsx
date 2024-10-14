import React, { useEffect, useState } from 'react'
import { getUserAddresses } from '../services/apiService'
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import { TOKEN_KEY } from '../utils/constants'
import { useLoading } from '../utils/context/LoadingContext'

const CheckoutStepShipping = ({
  selectedAddressId,
  setSelectedAddressId,
  setIsEditing,
  setNewAddress,
  newAddress,
  handleSessionExpiration,
}) => {
  const token = localStorage.getItem(TOKEN_KEY)
  const [addresses, setAddresses] = useState([])
  const { startLoading, stopLoading } = useLoading()
  useEffect(() => {
    const fetchAddresses = async () => {
      startLoading()
      try {
        const userAddresses = await getUserAddresses(token)
        setAddresses(userAddresses)
      } catch (error) {
        if (error.sessionExpired) {
          handleSessionExpiration() // Gérer la session expirée
        } else {
          console.error('Erreur lors du chargement des adresses', error)
        }
      } finally {
        stopLoading()
      }
    }
    fetchAddresses()
  }, [token])

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
            label="Nom de l'adresse"
            fullWidth
            value={newAddress.label}
            onChange={(e) =>
              setNewAddress({ ...newAddress, label: e.target.value })
            }
            sx={{ mb: 2 }} // Add margin bottom
          />
          <TextField
            label="Numéro"
            fullWidth
            value={newAddress.number}
            onChange={(e) =>
              setNewAddress({ ...newAddress, number: e.target.value })
            }
            sx={{ mb: 2 }} // Add margin bottom
          />
          <TextField
            label="Rue"
            fullWidth
            value={newAddress.street}
            onChange={(e) =>
              setNewAddress({ ...newAddress, street: e.target.value })
            }
            sx={{ mb: 2 }} // Add margin bottom
          />
          <TextField
            label="Complément d'adresse"
            fullWidth
            value={newAddress.additional}
            onChange={(e) =>
              setNewAddress({ ...newAddress, additional: e.target.value })
            }
            sx={{ mb: 2 }} // Add margin bottom
          />
          <TextField
            label="Ville"
            fullWidth
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
            sx={{ mb: 2 }} // Add margin bottom
          />
          <TextField
            label="Code postal"
            fullWidth
            value={newAddress.zip}
            onChange={(e) =>
              setNewAddress({ ...newAddress, zip: e.target.value })
            }
            sx={{ mb: 2 }} // Add margin bottom
          />
          <TextField
            label="Pays"
            fullWidth
            value={newAddress.country}
            onChange={(e) =>
              setNewAddress({ ...newAddress, country: e.target.value })
            }
            sx={{ mb: 2 }} // Add margin bottom
          />
        </Box>
      )}
    </Box>
  )
}

export default CheckoutStepShipping
