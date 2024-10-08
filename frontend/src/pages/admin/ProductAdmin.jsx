import React, { useEffect, useState } from 'react'
import { getProducts, deleteProduct } from '../../services/apiService'
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import EnhancedTable from '../../components/EnhancedTable'

const ProductAdmin = ({
  token,
  userRole,
  isLoggedIn,
  handleUnauthorizedAccess,
  handleSessionExpiration,
}) => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const handleUnauthenticated = () => {
    handleSessionExpiration()
    navigate('/')
  }

  const handleUnauthorized = () => {
    handleUnauthorizedAccess()
    navigate('/')
  }

  useEffect(() => {
    // Check if the user is authenticated
    if (!isLoggedIn) {
      handleUnauthenticated() // Open login modal if not authenticated
    }
  }, [isLoggedIn])

  useEffect(() => {
    // Check if the user is authenticated
    if (!['admin', 'employee'].includes(userRole)) {
      handleUnauthorized() // Open login modal if not authenticated
    }
  }, [userRole])

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const handleDelete = async (productId) => {
    await deleteProduct(productId)
    setProducts(products.filter((product) => product._id !== productId))
  }

  const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Nom' },
    { id: 'brand', numeric: false, disablePadding: false, label: 'Marque' },
    {
      id: 'category',
      numeric: false,
      disablePadding: false,
      label: 'Catégorie',
    },
    { id: 'stock', numeric: true, disablePadding: false, label: 'Stock' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Prix' },
    {
      id: 'createdAt',
      numeric: true,
      disablePadding: false,
      label: 'Date de création',
    },
  ]

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des produits
      </Typography>
      <Button
        component={Link}
        to="/admin/products/add"
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Ajouter un produit
      </Button>

      <EnhancedTable
        title="Produits"
        headCells={headCells}
        rows={products}
        handleDelete={handleDelete}
      />
    </Box>
  )
}

export default ProductAdmin
