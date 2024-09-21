import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/apiService'
import { CartContext } from '../utils/context/cartContext'
import { Typography, Box, Button, CardMedia, Chip } from '@mui/material'
import Alert from '@mui/material/Alert'

const Product = () => {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id)
        setProduct(productData)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product)
  }

  if (loading) return <Typography>Chargement...</Typography>
  if (error) return <Alert severity="error">{error.message}</Alert>

  return (
    product && (
      <Box sx={{ display: 'flex', gap: 4, padding: 4 }}>
        <Box>
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            alt={product.name}
            sx={{ borderRadius: 4 }}
          />
        </Box>
        <Box>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h6" color="text.secondary">
            {product.brand}
          </Typography>
          <Typography variant="body1" sx={{ marginY: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="h5">{product.price} €</Typography>

          {/* Gestion du stock */}
          {product.stock > 0 && product.stock < 5 && (
            <Chip label="Presque épuisé" color="warning" sx={{ marginY: 2 }} />
          )}
          {product.stock === 0 && (
            <Chip label="Indisponible" color="error" sx={{ marginY: 2 }} />
          )}
          {product.stock >= 5 && (
            <Chip label="En stock" color="success" sx={{ marginY: 2 }} />
          )}

          {/* Bouton ajouter au panier */}
          <Button
            variant="contained"
            color="primary"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            sx={{ marginTop: 2 }}
          >
            Ajouter au panier
          </Button>
        </Box>
      </Box>
    )
  )
}

export default Product
