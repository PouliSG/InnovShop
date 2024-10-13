import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material'
import { getUserAddresses, deleteAddress } from '../../services/apiService'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

function Addresses({ token, handleSessionExpiration }) {
  const [addresses, setAddresses] = useState([])
  const [editingAddress, setEditingAddress] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    fetchAddresses()
  }, [token])

  const fetchAddresses = async () => {
    try {
      const data = await getUserAddresses(token)
      setAddresses(data)
    } catch (error) {
      if (error.sessionExpired) {
        handleSessionExpiration()
      } else {
        console.error('Erreur lors de la récupération des adresses :', error)
      }
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette adresse ?')) {
      try {
        await deleteAddress(token, id)
        fetchAddresses()
      } catch (error) {
        if (error.sessionExpired) {
          handleSessionExpiration()
        } else {
          console.error("Erreur lors de la suppression de l'adresse :", error)
        }
      }
    }
  }

  const handleAdd = () => {
    setEditingAddress(null)
    navigate(`${location.pathname}/edit/add`)
  }

  const handleEdit = (address) => {
    setEditingAddress(address)
    navigate(`${location.pathname}/edit/${address._id}`)
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mes adresses
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAdd}
        sx={{ mb: 2 }}
      >
        Ajouter une adresse
      </Button>
      <List>
        {addresses.map((address) => (
          <ListItem
            key={address._id}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => handleEdit(address)}>
                  <Typography variant="body2">Modifier</Typography>
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(address._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={`${address.number} ${address.street}, ${address.city} ${address.zip}`}
              secondary={address.label}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Addresses
