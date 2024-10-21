import React, { useState, useEffect } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Switch,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import ProductListField from './ProductListField'
import ValidatedTextField from './ValidatedTextField'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { DataStructure, DefaultData } from '../utils/constants'
import {
  getCategories,
  getUsers,
  getProducts,
  getAddressesByUser,
} from '../services/apiService'
import { useTheme } from '../utils/context/themeContext'
import { useLoading } from '../utils/context/loadingContext'

function DataFormModal({
  token,
  onClose,
  handleSuccess,
  handleSessionExpiration,
  dataType,
  addMethod,
  updateMethod,
  getByIdMethod,
  modal = true,
}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [item, setItem] = useState(DefaultData[dataType]) // Pour stocker les données du formulaire
  const [categories, setCategories] = useState([]) // Pour stocker les catégories
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [shippingAddresses, setShippingAddresses] = useState([])
  const [isDirty, setIsDirty] = useState(false) // Pour suivre les modifications du formulaire
  const { theme, setThemeMode } = useTheme()
  const { startLoading, stopLoading } = useLoading()

  const [errors, setErrors] = useState({}) // Pour stocker les erreurs de validation

  var itemStructure = DataStructure[dataType]

  useEffect(() => {
    const fetchData = async () => {
      startLoading()
      try {
        if (dataType === 'commande') {
          // Charger les utilisateurs
          const usersData = await getUsers(token)
          setUsers(usersData)

          // Charger les produits
          const productsData = await getProducts()
          setProducts(productsData)
        } else if (dataType === 'produit') {
          // Charger les catégories
          const categoriesData = await getCategories()
          setCategories(categoriesData)
        }
        // Ajoutez d'autres chargements de données si nécessaire
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error)
      } finally {
        stopLoading()
      }
    }
    fetchData()
  }, [dataType])

  useEffect(() => {
    if (id || location.pathname.endsWith('/settings')) {
      // Si un ID est présent, nous sommes en mode édition
      const fetchItem = async () => {
        startLoading()
        try {
          var data
          if (['produit', 'catégorie', 'paramètres'].includes(dataType)) {
            data = await getByIdMethod(id)
          } else {
            data = await getByIdMethod(token, id)
          }
          setItem(data)
        } catch (error) {
          console.error('Erreur lors du chargement du produit', error)
        } finally {
          stopLoading()
        }
      }
      fetchItem()
    }
  }, [id])

  useEffect(() => {
    if (dataType === 'commande') {
      const calculateTotalPrice = () => {
        let total = 0
        item.products.forEach((productItem) => {
          const product = products.find(
            (p) => p._id === (productItem.product._id || productItem.product)
          )
          if (product) {
            total += product.price * productItem.quantity
          }
        })
        total === 0 && (total = null)
        setItem((prevItem) => ({ ...prevItem, totalPrice: total }))
      }
      calculateTotalPrice()
    }
  }, [item.products, products])

  const handleChange = async (e) => {
    setIsDirty(true)
    const { name, value } = e.target
    setItem({ ...item, [name]: value })
    setErrors({ ...errors, [name]: '' }) // Réinitialiser l'erreur du champ

    if (dataType === 'commande' && name === 'user') {
      try {
        // Charger les adresses de livraison pour l'utilisateur sélectionné
        const addressesData = await getAddressesByUser(token, value)
        setShippingAddresses(addressesData)
        // Réinitialiser l'adresse de livraison sélectionnée
        setItem((prevItem) => ({ ...prevItem, shippingAddress: '' }))
      } catch (error) {
        console.error('Erreur lors du chargement des adresses :', error)
      }
    }
  }

  const handleBlur = (field) => {
    const value = item[field.name]
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Vérifier s'il y a des erreurs de validation
    const hasErrors = Object.values(errors).some((error) => error)
    if (hasErrors) {
      alert('Veuillez corriger les erreurs avant de soumettre le formulaire.')
      return
    }
    startLoading()
    try {
      if (id) {
        await updateMethod(token, id, item)
      } else {
        await addMethod(token, item)
      }
      setIsDirty(false)
      if (dataType === 'paramètres') {
        // set theme with value
        setThemeMode(item.theme)
      } else {
        navigate(-1)
      }
      handleSuccess()
    } catch (error) {
      if (error.sessionExpired) {
        handleSessionExpiration() // Gérer la session expirée
      } else {
        console.error('Erreur lors de la sauvegarde du produit', error)
      }
    } finally {
      stopLoading()
    }
  }

  const handleClose = () => {
    if (isDirty) {
      if (
        window.confirm(
          'Des modifications non sauvegardées seront perdues. Voulez-vous continuer ?'
        )
      ) {
        onClose()
      }
    } else {
      onClose()
    }
  }

  const formContent = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        ...(modal
          ? {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              width: 700,
              maxHeight: '100vh',
              overflowY: 'auto',
            }
          : {
              width: '100%',
              maxWidth: 700,
              margin: '0 auto',
            }),
      }}
    >
      {modal && (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      {modal && (
        <Typography variant="h6" component="h2" mb={2}>
          {id
            ? `Modifier un${(dataType.endsWith('e') ? 'e ' : ' ') + dataType}`
            : `Ajouter un${(dataType.endsWith('e') ? 'e ' : ' ') + dataType}`}
        </Typography>
      )}
      {/* Champs du formulaire */}
      <Box display="flex" flexDirection="column" gap={2}>
        {itemStructure.map((field) => {
          switch (field.type) {
            case 'TextField':
              return (
                <ValidatedTextField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={item[field.name] || ''}
                  onChange={handleChange}
                  onBlur={() => handleBlur(field)}
                  fullWidth
                  required={field.required}
                  type={field.inputType || 'text'}
                  inputProps={field.readOnly ? { readOnly: true } : {}}
                  validation={field.validation}
                  errorMessage={errors[field.name]}
                />
              )
            case 'Select':
              const elements = Array.isArray(field.values)
                ? field.values
                : {
                    categories,
                    shippingAddresses,
                  }[field.values]
              return (
                <TextField
                  key={field._id}
                  select
                  label={field.label}
                  name={field.name}
                  value={item[field.name] || ''}
                  onChange={handleChange}
                  fullWidth
                  required={field.required}
                  margin="normal"
                >
                  {elements &&
                    elements.map((element) => (
                      <MenuItem
                        key={element[field.key] || element.value || element}
                        value={element[field.key] || element.value || element}
                      >
                        {element[field.value] || element.label || element}
                      </MenuItem>
                    ))}
                </TextField>
              )
            case 'AutocComplete':
              const options = Array.isArray(field.values)
                ? field.values
                : {
                    users,
                  }[field.values]
              return (
                <Autocomplete
                  key={field.name}
                  options={options}
                  getOptionLabel={field.value}
                  value={
                    options.find(
                      (option) => option[field.key] === item[field.name]
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    setIsDirty(true)
                    setItem({
                      ...item,
                      [field.name]: newValue, // ? newValue[field.key] : '',
                    })

                    // Charger les adresses lorsque l'utilisateur est sélectionné
                    if (
                      dataType === 'commande' &&
                      field.name === 'user' &&
                      newValue
                    ) {
                      ;(async () => {
                        try {
                          const addressesData = await getAddressesByUser(
                            token,
                            newValue[field.key]
                          )
                          setShippingAddresses(addressesData)
                          setItem((prevItem) => ({
                            ...prevItem,
                            shippingAddress: '',
                          }))
                        } catch (error) {
                          console.error(
                            'Erreur lors du chargement des adresses :',
                            error
                          )
                        }
                      })()
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={field.label}
                      margin="normal"
                      required={field.required}
                    />
                  )}
                />
              )
            case 'ProductList':
              return (
                <ProductListField
                  key={field.name}
                  products={products}
                  value={item[field.name]}
                  onChange={(newProducts) => {
                    setIsDirty(true)
                    setItem({ ...item, [field.name]: newProducts })
                  }}
                />
              )
            case 'CheckBox':
              return (
                <FormControlLabel
                  key={field.name}
                  control={
                    <Checkbox
                      checked={item[field.name] || false}
                      onChange={(e) => {
                        setIsDirty(true)
                        setItem({ ...item, [field.name]: e.target.checked })
                      }}
                      name={field.name}
                      color="primary"
                    />
                  }
                  label={field.label}
                />
              )
            case 'Switch':
              return (
                <FormControlLabel
                  key={field.name}
                  control={
                    <Switch
                      checked={item[field.name] || false}
                      onChange={(e) => {
                        setIsDirty(true)
                        setItem({ ...item, [field.name]: e.target.checked })
                      }}
                      name={field.name}
                      color="secondary"
                    />
                  }
                  label={field.label}
                />
              )
            default:
              return null
          }
        })}
      </Box>
      {/* Boutons d'action */}
      <Box display="flex" justifyContent="flex-end" gap={0.5}>
        {modal && (
          <Button variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
        )}
        <Button variant="contained" type="submit">
          {id || !modal ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </Box>
    </Box>
  )
  if (modal) {
    return (
      <Modal open onClose={handleClose}>
        {formContent}
      </Modal>
    )
  } else {
    return formContent
  }
}

export default DataFormModal
