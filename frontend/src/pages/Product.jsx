import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getProductById } from '../services/apiService'
import { CartContext } from '../utils/context/cartContext'
import { Typography, Box, Button, CardMedia, Chip } from '@mui/material'
import Alert from '@mui/material/Alert'
import StarIcon from '@mui/icons-material/Star'

const Product = () => {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation() // Récupère les informations sur la page précédente

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

  // Fonction pour gérer le retour en arrière, en gardant les filtres et l'état de la page précédente
  const handleBackClick = () => {
    if (location.state) {
      const { category, page, filter, sort } = location.state
      navigate('/products', { state: { category, page, filter, sort } })
    } else {
      navigate('/')
    }
  }

  if (loading) return <Typography>Chargement...</Typography>
  if (error) return <Alert severity="error">{error.message}</Alert>

  return (
    product && (
      <Box sx={{ padding: 4 }}>
        {/* Bouton Retour */}
        <Button
          variant="outlined"
          color="third"
          onClick={handleBackClick}
          sx={{ mb: 2 }}
        >
          Retour
        </Button>

        {/* Détails du produit */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.name}
              sx={{ borderRadius: 4 }}
            />
            {product.featured && (
              <StarIcon
                color="secondary"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  scale: 2,
                }}
              />
            )}
          </Box>
          <Box>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="h6" color="text.secondary">
              {product.brand}
            </Typography>
            <Typography variant="body1" sx={{ margin: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="h5">{product.price} €</Typography>

            {/* Gestion du stock */}
            {product.stock > 0 && product.stock < 5 && (
              <Chip label="Presque épuisé" color="warning" sx={{ margin: 2 }} />
            )}
            {product.stock === 0 && (
              <Chip label="Indisponible" color="error" sx={{ margin: 2 }} />
            )}
            {product.stock >= 5 && (
              <Chip label="En stock" color="success" sx={{ margin: 2 }} />
            )}

            {/* Bouton ajouter au panier */}
            <Button
              variant="contained"
              color="secondary"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
              sx={{ margin: 2, fontWeight: 'bold' }}
            >
              Ajouter au panier
            </Button>
          </Box>
        </Box>
      </Box>
    )
  )
}

export default Product
