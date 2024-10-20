import { useState, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Modal,
  IconButton,
  Badge,
} from '@mui/material'
import { styled } from '@mui/system'
import HomeIcon from '@mui/icons-material/Home'
import StorefrontIcon from '@mui/icons-material/Storefront'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import darkLogo from '../assets/InnovShop_logo_dark.png'
import lightLogo from '../assets/InnovShop_logo_light.png'
import CartMenu from './CartMenu'
import AdminMenu from './AdminMenu'
import { useTheme as useMUITheme } from '@mui/material/styles'
import { CartContext } from '../utils/context/cartContext'

const Logo = styled('img')({
  height: '100px',
})

function Header({
  handleLoginOpen,
  handleRegisterOpen,
  onLogout,
  isLoggedIn,
  userRole,
}) {
  const muiTheme = useMUITheme()
  const { cart, totalQuantity } = useContext(CartContext) // Utiliser le contexte du panier
  const [isLogoutOpen, setLogoutOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null) // Pour gérer le menu panier
  const [adminMenuAnchorEl, setAdminMenuAnchorEl] = useState(null) // Pour gérer le menu admin
  const location = useLocation()

  useEffect(() => {}, [cart, totalQuantity])

  const handleLogoutOpen = () => setLogoutOpen(true)
  const handleLogoutClose = () => setLogoutOpen(false)

  const handleConfirmLogout = () => {
    onLogout()
    handleLogoutClose()
  }

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCartClose = () => {
    setAnchorEl(null)
  }

  // Gestion de l'ouverture/fermeture du menu Admin
  const handleAdminMenuOpen = (event) => {
    setAdminMenuAnchorEl(event.currentTarget)
  }

  const handleAdminMenuClose = () => {
    setAdminMenuAnchorEl(null)
  }

  const getButtonStyles = (path) => ({
    whiteSpace: 'nowrap',
    color:
      location.pathname === path ||
      (path !== '/' && location.pathname.startsWith(path))
        ? muiTheme.palette.text.secondary
        : muiTheme.palette.text.primary,
    '&:hover': {
      color: muiTheme.palette.text.secondary,
    },
    '& .MuiButton-startIcon': {
      color:
        location.pathname === path ||
        (path !== '/' && location.pathname.startsWith(path))
          ? muiTheme.palette.text.secondary
          : muiTheme.palette.text.primary,
    },
    '&:hover .MuiButton-startIcon': {
      color: muiTheme.palette.text.secondary,
    },
  })

  const getContainedButtonStyles = (path) => ({
    whiteSpace: 'nowrap',
    color:
      location.pathname === path ||
      (path !== '/' && location.pathname.startsWith(path))
        ? muiTheme.palette.text.secondary
        : muiTheme.palette.text.third,
    '&:hover': {
      color: muiTheme.palette.text.secondary,
    },
    '& .MuiButton-startIcon': {
      color:
        location.pathname === path ||
        (path !== '/' && location.pathname.startsWith(path))
          ? muiTheme.palette.text.secondary
          : muiTheme.palette.text.third,
    },
    '&:hover .MuiButton-startIcon': {
      color: muiTheme.palette.text.secondary,
    },
  })

  const getIconButtonStyles = (path) => ({
    color:
      location.pathname === path ||
      (path !== '/' && location.pathname.startsWith(path))
        ? muiTheme.palette.text.secondary.main
        : muiTheme.palette.text.primary.main,
    '&:hover': {
      color: muiTheme.palette.text.secondary,
    },
    borderRadius: muiTheme.shape.borderRadius,
  })

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: muiTheme.palette.background.default }}
    >
      <Toolbar
        sx={{
          pt: 1,
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            alignSelf: 'flex-start',
          }}
        >
          <Logo
            src={muiTheme.palette.mode === 'dark' ? darkLogo : lightLogo}
            alt="Logo"
          />
          <Typography
            variant="h6"
            sx={{
              color: muiTheme.palette.text.primary,
              ml: 2,
              fontStyle: 'italic',
            }}
          >
            Explorez l'innovation, chaque jour.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            variant="text"
            sx={getButtonStyles('/')}
          >
            Accueil
          </Button>
          <Button
            component={Link}
            to="/products"
            startIcon={<StorefrontIcon />}
            variant="text"
            sx={getButtonStyles('/products')}
          >
            Nos Produits
          </Button>

          {/* Bouton Panier avec badge pour le nombre d'articles */}
          <IconButton
            onClick={handleCartClick} // Ouvrir le menu au clic
            sx={getIconButtonStyles('/cart')}
          >
            <Badge badgeContent={totalQuantity} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Menu pour afficher le contenu du panier */}
          <CartMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            cart={cart}
            handleCartClose={handleCartClose}
            muiTheme={muiTheme}
          />

          {!isLoggedIn && (
            <>
              <Button
                onClick={handleLoginOpen}
                startIcon={<LoginIcon />}
                variant="contained"
                color="primary"
                sx={{
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
                Connexion
              </Button>
              <Button
                onClick={handleRegisterOpen}
                startIcon={<PersonAddIcon />}
                variant="contained"
                color="primary"
                sx={{
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
                Créer un compte
              </Button>
            </>
          )}

          {isLoggedIn && (
            <>
              <Button
                component={Link}
                to="/account"
                startIcon={<AccountCircleIcon />}
                variant="contained"
                color="primary"
                sx={getContainedButtonStyles('/account')}
              >
                Mon Compte
              </Button>

              {(userRole === 'admin' || userRole === 'employee') && (
                <>
                  <Button
                    startIcon={<AdminPanelSettingsIcon />}
                    variant="contained"
                    color="primary"
                    onClick={handleAdminMenuOpen} // Ouvrir le menu Admin
                    sx={getContainedButtonStyles('/admin')}
                  >
                    Administration
                  </Button>
                  <AdminMenu
                    userRole={userRole}
                    location={location}
                    anchorEl={adminMenuAnchorEl}
                    open={Boolean(adminMenuAnchorEl)}
                    onClose={handleAdminMenuClose}
                    handleClose={handleAdminMenuClose}
                    muiTheme={muiTheme}
                    sx={{ width: '100%' }}
                  />
                </>
              )}

              <Button
                onClick={handleLogoutOpen}
                startIcon={<LogoutIcon />}
                variant="contained"
                color="primary"
                sx={{
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
                Déconnexion
              </Button>

              {/* Confirmation Modal for Logout */}
              <Modal open={isLogoutOpen} onClose={handleLogoutClose}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    width: 400, // Width of the modal
                    textAlign: 'center', // Center the text
                  }}
                >
                  <Typography variant="h6" component="h2">
                    Confirmer la déconnexion
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    Êtes-vous sûr de vouloir vous déconnecter ?
                  </Typography>
                  <Box
                    sx={{
                      mt: 4,
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleConfirmLogout}
                    >
                      Oui
                    </Button>
                    <Button variant="outlined" onClick={handleLogoutClose}>
                      Annuler
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
