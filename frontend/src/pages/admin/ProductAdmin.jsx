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

const ProductAdmin = ({ token, isLoggedIn, handleSessionExpiration }) => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const handleUnauthenticated = () => {
    handleSessionExpiration()
    navigate('/')
  }

  useEffect(() => {
    // Check if the user is authenticated
    if (!isLoggedIn) {
      handleUnauthenticated() // Open login modal if not authenticated
    }
  }, [])

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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price} €</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={`/admin/products/edit/${product._id}`}
                  variant="outlined"
                >
                  Modifier
                </Button>
                <Button color="error" onClick={() => handleDelete(product._id)}>
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default ProductAdmin
