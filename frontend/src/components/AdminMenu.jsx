import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory'
import StyleIcon from '@mui/icons-material/Style'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import DashboardIcon from '@mui/icons-material/Dashboard'

function AdminMenu({
  userRole,
  location,
  anchorEl,
  open,
  onClose,
  handleClose,
  muiTheme,
}) {
  const getStyles = (path) => ({
    color:
      location.pathname === path ||
      (path !== '/admin' && location.pathname.startsWith(path))
        ? muiTheme.palette.text.secondary
        : muiTheme.palette.text.primary,
  })

  const getMenuItemStyles = (path) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '16px',
    paddingRight: '16px',
    color: getStyles(path).color,
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: getStyles(path).color,
    },
    '&:hover': {
      backgroundColor: muiTheme.palette.action.hover, // Optionnel
      color: muiTheme.palette.text.secondary,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: muiTheme.palette.text.secondary,
      },
    },
  })

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          style: {
            width: anchorEl ? anchorEl.clientWidth : undefined,
          },
        },
      }}
    >
      <MenuItem
        component={Link}
        to="/admin"
        onClick={handleClose}
        sx={getMenuItemStyles('/admin')}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText
          primary="Tableau de bord"
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </MenuItem>

      <MenuItem
        component={Link}
        to="/admin/products"
        onClick={handleClose}
        sx={getMenuItemStyles('/admin/products')}
      >
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText
          primary="Produits"
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </MenuItem>

      <MenuItem
        component={Link}
        to="/admin/categories"
        onClick={handleClose}
        sx={getMenuItemStyles('/admin/categories')}
      >
        <ListItemIcon>
          <StyleIcon />
        </ListItemIcon>
        <ListItemText
          primary="Catégories"
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </MenuItem>

      <MenuItem
        component={Link}
        to="/admin/orders"
        onClick={handleClose}
        sx={getMenuItemStyles('/admin/orders')}
      >
        <ListItemIcon>
          <ShoppingBagIcon />
        </ListItemIcon>
        <ListItemText
          primary="Commandes"
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </MenuItem>

      {userRole === 'admin' && (
        <MenuItem
          component={Link}
          to="/admin/users"
          onClick={handleClose}
          sx={getMenuItemStyles('/admin/users')}
        >
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText
            primary="Utilisateurs"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      )}
    </Menu>
  )
}

export default AdminMenu
