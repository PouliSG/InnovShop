import React, { useContext } from 'react'
import { CartContext } from '../utils/context/cartContext'
import { Box, Typography, Divider, Avatar, Grid2 as Grid } from '@mui/material'

const CheckoutStepSummary = ({ muiTheme }) => {
  const { cart } = useContext(CartContext)

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          backgroundColor: muiTheme.palette.background.paper,
          fontWeight: 'bold',
        }}
      >
        <Typography variant="body1" sx={{ width: '12%' }}>
          Image
        </Typography>
        <Typography variant="body1" sx={{ width: '67%' }}>
          Produit
        </Typography>
        <Typography variant="body1" sx={{ width: '6%' }}>
          Qté
        </Typography>
        <Typography variant="body1" sx={{ width: '15%', textAlign: 'right' }}>
          Prix
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: 1 }}>
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
            <Box
              sx={{
                width: '10%',
                display: 'flex',
                justifyContent: 'left',
                pl: 1,
              }}
            >
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

            {/* Quantité, alignée à droite */}
            <Box
              sx={{
                width: '12%',
                justifyContent: 'right',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ mr: 1 }}>
                {item.quantity}x
              </Typography>
            </Box>

            {/* Prix, aligné à droite */}
            <Box sx={{ width: '15%', textAlign: 'right', pr: 1 }}>
              <Typography variant="h6">
                {item.product.price * item.quantity} €
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* Total de la commande */}
      <Divider sx={{ mt: 4 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
    </Box>
  )
}

export default CheckoutStepSummary
