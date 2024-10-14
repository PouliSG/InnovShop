import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid2 as Grid,
  IconButton,
  TextField,
  Avatar,
} from '@mui/material'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTheme as useMUITheme } from '@mui/material/styles'
import { CartContext } from '../utils/context/CartContext'

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity } =
    useContext(CartContext)
  const muiTheme = useMUITheme()

  if (cart.products.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Votre panier est vide
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="primary"
        >
          Continuer vos achats
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mon panier
      </Typography>
      <Divider />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {cart.products.map((item) => (
          <Grid
            item="true"
            xs={12}
            key={item.product._id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            {/* Vignette de l'image du produit */}
            <Box sx={{ width: '10%', display: 'flex', justifyContent: 'left' }}>
              <Avatar
                src={item.product.image}
                alt={item.product.name}
                variant="square"
                sx={{ width: 64, height: 64 }}
              />
            </Box>

            {/* Nom du produit, aligné à gauche */}
            <Box sx={{ width: '53%', textAlign: 'left' }}>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.product.name}
              </Typography>
            </Box>

            {/* Quantité éditable, alignée à droite */}
            <Box
              sx={{
                width: '12%',
                justifyContent: 'right',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ mr: 1 }}>
                Qté:{' '}
              </Typography>
              <TextField
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateCartItemQuantity(item.product._id, e.target.value)
                }
                inputProps={{ min: 1, max: item.product.stock }}
                sx={{ ml: 1, width: 80 }}
              />
            </Box>

            {/* Prix, aligné à droite */}
            <Box sx={{ width: '15%', textAlign: 'right' }}>
              <Typography variant="h6">
                {item.product.price * item.quantity} €
              </Typography>
            </Box>

            {/* Supprimer l'élément du panier */}
            <Box
              sx={{ width: '10%', display: 'flex', justifyContent: 'right' }}
            >
              <IconButton
                color={muiTheme.palette.primary.main}
                onClick={() => removeFromCart(item.product._id)}
                sx={{ '&:hover': { color: muiTheme.palette.secondary.main } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ mt: 4 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Typography variant="h5" color="secondary">
          Total :
        </Typography>
        <Typography variant="h5" color="secondary">
          {cart.products.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          )}{' '}
          €
        </Typography>
      </Box>
      <Button
        component={Link}
        to="/checkout"
        variant="contained"
        color="primary"
        startIcon={<ShoppingCartCheckoutIcon />}
        sx={{
          mt: 4,
          width: '100%',
          color: muiTheme.palette.text.third,
          '&:hover': {
            color: muiTheme.palette.text.secondary, // Change text color on hover
          },
          '& .MuiButton-startIcon': {
            color: muiTheme.palette.text.third, // Color of the icon
          },
          '&:hover .MuiButton-startIcon': {
            color: muiTheme.palette.text.secondary, // Icon color on hover
          },
        }}
      >
        Valider le panier
      </Button>
    </Box>
  )
}

export default Cart
