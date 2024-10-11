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
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import ProductListField from './ProductListField'
import { useParams, useNavigate } from 'react-router-dom'
import { DataStructure, DefaultData } from '../utils/constants'
import {
  getCategories,
  getUsers,
  getProducts,
  getAddressesByUser,
} from '../services/apiService'

function DataFormModal({
  token,
  onClose,
  handleSuccess,
  handleSessionExpiration,
  dataType,
  addMethod,
  updateMethod,
  getByIdMethod,
}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(DefaultData[dataType]) // Pour stocker les données du formulaire
  const [categories, setCategories] = useState([]) // Pour stocker les catégories
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [shippingAddresses, setShippingAddresses] = useState([])
  const [isDirty, setIsDirty] = useState(false) // Pour suivre les modifications du formulaire

  const orderStatuses = ['pending', 'shipped', 'delivered', 'cancelled']
  const paymentStatuses = ['pending', 'paid', 'failed']

  var itemStructure = DataStructure[dataType]

  useEffect(() => {
    const fetchData = async () => {
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
      }
    }
    fetchData()
  }, [dataType])

  useEffect(() => {
    if (id) {
      // Si un ID est présent, nous sommes en mode édition
      const fetchItem = async () => {
        try {
          var data
          if (['produit', 'catégorie'].includes(dataType)) {
            data = await getByIdMethod(id)
          } else {
            data = await getByIdMethod(token, id)
          }
          setItem(data)
        } catch (error) {
          console.error('Erreur lors du chargement du produit', error)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        await updateMethod(token, id, item)
      } else {
        await addMethod(token, item)
      }
      setIsDirty(false)
      handleSuccess()
      navigate(-1)
    } catch (error) {
      if (error.sessionExpired) {
        handleSessionExpiration() // Gérer la session expirée
      } else {
        console.error('Erreur lors de la sauvegarde du produit', error)
      }
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

  return (
    <Modal open onClose={handleClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
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
        }}
      >
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
        <Typography variant="h6" component="h2" mb={2}>
          {id
            ? `Modifier ${(dataType.endsWith('e') ? 'la ' : 'le ') + dataType}`
            : `Ajouter un${(dataType.endsWith('e') ? 'e ' : ' ') + dataType}`}
        </Typography>
        {/* Champs du formulaire */}
        <Box display="flex" flexDirection="column" gap={2}>
          {itemStructure.map((field) => {
            switch (field.type) {
              case 'TextField':
                return (
                  <TextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={item[field.name] || ''}
                    onChange={handleChange}
                    fullWidth
                    required={field.required}
                    margin="normal"
                    type={field.inputType || 'text'}
                    InputProps={field.readOnly ? { readOnly: true } : {}}
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
                          key={element[field.key] || element}
                          value={element[field.key] || element}
                        >
                          {element[field.value]
                            ? element[field.value]
                            : element}
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
              default:
                return null
            }
          })}
        </Box>
        {/* Boutons d'action */}
        <Box display="flex" justifyContent="flex-end" gap={0.5}>
          <Button variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="contained" type="submit">
            {id ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DataFormModal
