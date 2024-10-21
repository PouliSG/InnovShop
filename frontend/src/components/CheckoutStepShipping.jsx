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
import { TOKEN_KEY, DataStructure } from '../utils/constants'
import { useLoading } from '../utils/context/loadingContext'
import ValidatedTextField from './ValidatedTextField'

const CheckoutStepShipping = ({
  selectedAddressId,
  setSelectedAddressId,
  setIsEditing,
  setNewAddress,
  newAddress,
  handleSessionExpiration,
  errors,
  setErrors,
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

  const addressFields = DataStructure.adresse

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setNewAddress({ ...newAddress, [name]: value })
    setErrors({ ...errors, [name]: '' }) // Réinitialiser l'erreur du champ
  }

  const handleAddressBlur = (field) => {
    const value = newAddress[field.name]
    if (field.required && !value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.name]: 'Ce champ est requis.',
      }))
    } else if (field.validation && value && !field.validation.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.name]: field.errorMessage,
      }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field.name]: '' }))
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
          {addressFields.map((field) => (
            <ValidatedTextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={newAddress[field.name] || ''}
              onChange={handleAddressChange}
              onBlur={() => handleAddressBlur(field)}
              fullWidth
              required={field.required}
              validation={field.validation}
              errorMessage={errors[field.name]}
              sx={{ mb: 2 }}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default CheckoutStepShipping
