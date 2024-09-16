import React from 'react'
import { Box, TextField, MenuItem, Select } from '@mui/material'

const ProductFilters = ({
  categories,
  category,
  setCategory,
  setSort,
  setFilter,
}) => {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleSortChange = (e) => {
    setSort(e.target.value)
  }

  const handlePriceChange = (e) => {
    const priceRange = e.target.value.split('-').map(Number)
    setFilter((prev) => ({ ...prev, priceRange }))
  }

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        select
        label="Catégorie"
        value={category}
        onChange={handleCategoryChange}
        fullWidth
        margin="normal"
      >
        {/* Itérer les catégories depuis la base de données */}
        <MenuItem value="all">Toutes les catégories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>

      <Select
        label="Trier par"
        defaultValue="recent"
        onChange={handleSortChange}
        fullWidth
      >
        <MenuItem value="recent">Date d'ajout</MenuItem>
        <MenuItem value="priceAsc">Prix croissant</MenuItem>
        <MenuItem value="priceDesc">Prix décroissant</MenuItem>
        <MenuItem value="brand">Marque</MenuItem>
      </Select>

      <TextField
        label="Filtrer par prix"
        onChange={handlePriceChange}
        helperText="Ex: 50-200"
        fullWidth
        margin="normal"
      />
    </Box>
  )
}

export default ProductFilters
