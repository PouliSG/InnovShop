import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid2 as Grid,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Button,
  Autocomplete,
} from '@mui/material'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'

function ProductListField({ products, value, onChange }) {
  const [productEntries, setProductEntries] = useState(
    value || [{ product: null, quantity: 1 }]
  )

  useEffect(() => {
    onChange(productEntries)
  }, [productEntries])

  const handleAddProductLine = () => {
    setProductEntries([...productEntries, { product: null, quantity: 1 }])
  }

  const handleRemoveProductLine = (index) => {
    const newEntries = productEntries.filter((_, idx) => idx !== index)
    setProductEntries(newEntries)
  }

  const handleProductChange = (index, field, newValue) => {
    const newEntries = [...productEntries]
    newEntries[index][field] = newValue
    setProductEntries(newEntries)
  }

  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel shrink>Produits</InputLabel>
      <Box
        sx={{
          padding: 2,
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: '4px',
          marginTop: '8px',
        }}
      >
        {productEntries.map((entry, index) => (
          <Grid container spacing={1} alignItems="center" key={index}>
            {/* Champ Autocomplete pour le produit */}
            <Grid item xs={8}>
              <Autocomplete
                options={products}
                getOptionLabel={(option) => option.name}
                value={entry.product}
                onChange={(event, newValue) =>
                  handleProductChange(index, 'product', newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Produit"
                    variant="outlined"
                    required
                  />
                )}
              />
            </Grid>
            {/* Champ pour la quantité */}
            <Grid item={true} xs={2}>
              <TextField
                label="Quantité"
                type="number"
                variant="outlined"
                slotProps={{
                  input: { min: 1 },
                }}
                value={entry.quantity}
                onChange={(e) =>
                  handleProductChange(
                    index,
                    'quantity',
                    parseInt(e.target.value)
                  )
                }
                required
              />
            </Grid>
            {/* Bouton pour supprimer la ligne */}
            <Grid item xs={2}>
              <IconButton onClick={() => handleRemoveProductLine(index)}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        {/* Bouton pour ajouter une nouvelle ligne */}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddProductLine}
          sx={{ marginTop: 2 }}
        >
          Ajouter un produit
        </Button>
      </Box>
    </FormControl>
  )
}

export default ProductListField
