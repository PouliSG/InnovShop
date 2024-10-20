import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Typography, Menu, MenuItem } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'

const CartMenu = ({ anchorEl, open, cart, handleCartClose, muiTheme }) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleCartClose}>
      {cart.products.length === 0 ? (
        <MenuItem>Votre panier est vide</MenuItem>
      ) : (
        [
          <Button
            component={Link}
            startIcon={<ShoppingCartIcon />}
            color="secondary"
            to="/cart"
            onClick={handleCartClose}
            sx={{
              width: '100%',
              textAlign: 'center',
              '& .MuiButton-startIcon': {
                color: muiTheme.palette.text.secondary, // Color of the icon
              },
            }}
            key="open-cart"
          >
            Ouvrir mon panier
          </Button>,

          <Box
            key="header"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
            }}
          >
            <Typography variant="body1" sx={{ width: '20%' }}>
              Qté
            </Typography>
            <Typography variant="body1" sx={{ width: '50%' }}>
              Produit
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: '30%', textAlign: 'right' }}
            >
              Prix
            </Typography>
          </Box>,

          // Utilisez directement map ici sans les {}
          ...cart.products.map((item) => (
            <MenuItem
              component={Link}
              to={`/products/${item.product._id}`}
              key={item.product._id}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
              onClick={handleCartClose}
            >
              <Typography variant="body2" sx={{ width: '20%' }}>
                {item.quantity}x
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  width: '50%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'inline-block',
                  textAlign: 'left',
                  position: 'relative',
                }}
              >
                {item.product.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ width: '30%', textAlign: 'right' }}
              >
                {item.product.price} €
              </Typography>
            </MenuItem>
          )),

          <Box
            key="total"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
              borderTop: '1px solid #ddd',
            }}
          >
            <Typography variant="body1" sx={{ width: '20%' }}>
              Total
            </Typography>
            <Typography variant="body1" sx={{ width: '50%' }}></Typography>
            <Typography
              variant="body1"
              sx={{ width: '30%', textAlign: 'right' }}
            >
              {cart.products.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
              )}{' '}
              €
            </Typography>
          </Box>,

          <Button
            component={Link}
            startIcon={<ShoppingCartCheckoutIcon />}
            color="secondary"
            to="/checkout"
            onClick={handleCartClose}
            sx={{
              width: '100%',
              textAlign: 'center',
              '& .MuiButton-startIcon': {
                color: muiTheme.palette.text.secondary, // Color of the icon
              },
            }}
            key="validate-cart"
          >
            Valider le panier
          </Button>,
        ]
      )}
    </Menu>
  )
}

export default CartMenu
