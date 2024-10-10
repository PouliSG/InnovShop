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
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useParams, useNavigate } from 'react-router-dom'
import { DataStructure, DefaultData } from '../utils/constants'
import { getCategories } from '../services/apiService'

function ProductFormModal({
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
  const [isDirty, setIsDirty] = useState(false) // Pour suivre les modifications du formulaire

  const itemStructure = DataStructure[dataType]

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories()
        setCategories(categories)
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error)
      }
    }
    if (dataType === 'produit') {
      fetchCategories()
    }
  }, [dataType])

  useEffect(() => {
    if (id) {
      // Si un ID est présent, nous sommes en mode édition
      const fetchProduct = async () => {
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
      fetchProduct()
    }
  }, [id])

  const handleChange = (e) => {
    setIsDirty(true)
    setItem({ ...item, [e.target.name]: e.target.value })
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
                />
              )
            case 'Select':
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
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
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
        {/* Boutons d'action */}
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
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

export default ProductFormModal
