import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getProductById } from '../services/apiService'
import { CartContext } from '../utils/context/cartContext'
import {
  Typography,
  Box,
  Button,
  CardMedia,
  Chip,
  MenuItem,
  Select,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import StarIcon from '@mui/icons-material/Star'

const Product = () => {
  const { id } = useParams()
  const { cart, addToCart } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1) // Quantité initiale
  const [isInCart, setIsInCart] = useState(false) // État pour vérifier si le produit est dans le panier
  const navigate = useNavigate()
  const location = useLocation()

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

  useEffect(() => {
    // Vérifie si le produit est déjà dans le panier
    const productInCart = cart?.products.find((p) => p.product._id === id)
    if (productInCart) {
      setIsInCart(true)
      setQuantity(productInCart.quantity)
    }
  }, [cart, id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setIsInCart(true)
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value)
  }

  const handleBackClick = () => {
    if (location.state) {
      const { category, page, filter, sort } = location.state
      category
        ? navigate('/products', { state: { category, page, filter, sort } })
        : navigate('/')
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

            {/* Dropdown pour la quantité */}
            <Select
              value={quantity}
              onChange={handleQuantityChange}
              sx={{ mb: 2 }}
              disabled={isInCart} // Désactivé si le produit est déjà dans le panier
            >
              {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>

            {/* Bouton ajouter au panier */}
            {isInCart ? (
              <Button variant="contained" disabled sx={{ margin: 2 }}>
                Déjà ajouté
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
                sx={{ margin: 2, fontWeight: 'bold' }}
              >
                Ajouter au panier
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    )
  )
}

export default Product
