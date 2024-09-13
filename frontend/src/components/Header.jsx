import { useState } from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { AppBar, Toolbar, Typography, Button, Box, Modal } from '@mui/material'
import { styled } from '@mui/system'
import HomeIcon from '@mui/icons-material/Home'
import StorefrontIcon from '@mui/icons-material/Storefront'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LogoutIcon from '@mui/icons-material/Logout'
import darkLogo from '../assets/InnovShop_logo_dark.png'
import lightLogo from '../assets/InnovShop_logo_light.png'
import { useTheme as useMUITheme } from '@mui/material/styles'
import { isAuthenticated } from '../services/authService'
import { TOKEN_KEY } from '../constants'

const Logo = styled('img')({
  height: '100px',
})

function Header({
  handleLoginOpen,
  handleRegisterOpen,
  onLogout,
  token,
  setToken,
}) {
  token ||= localStorage.getItem(TOKEN_KEY)

  const muiTheme = useMUITheme()
  const isLoggedIn = isAuthenticated()
  const decodedToken = token ? jwtDecode(token) : null
  const userRole = isLoggedIn ? decodedToken.user.role : null

  const [isLogoutOpen, setLogoutOpen] = useState(false)

  const handleLogoutOpen = () => setLogoutOpen(true)
  const handleLogoutClose = () => setLogoutOpen(false)

  const handleConfirmLogout = () => {
    onLogout()
    handleLogoutClose()
  }

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: muiTheme.palette.background.default }}
    >
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            variant="text"
            sx={{
              color: muiTheme.palette.text.primary,
              '& .MuiButton-startIcon': {
                color: muiTheme.palette.text.primary, // Color of the icon
              },
              '&:hover .MuiButton-startIcon': {
                color: muiTheme.palette.text.secondary, // Icon color on hover
              },
            }}
          >
            Accueil
          </Button>
          <Button
            component={Link}
            to="/products/1"
            startIcon={<StorefrontIcon />}
            variant="text"
            sx={{
              color: muiTheme.palette.text.primary,
              '& .MuiButton-startIcon': {
                color: muiTheme.palette.text.primary, // Color of the icon
              },
              '&:hover .MuiButton-startIcon': {
                color: muiTheme.palette.text.secondary, // Icon color on hover
              },
            }}
          >
            Nos Produits
          </Button>

          {!isLoggedIn && (
            <>
              <Button
                onClick={handleLoginOpen}
                startIcon={<LoginIcon />}
                variant="contained"
                color="primary"
                sx={{
                  color: muiTheme.palette.text.third,
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
                color="secondary"
                sx={{
                  color: muiTheme.palette.text.third,
                  '& .MuiButton-startIcon': {
                    color: muiTheme.palette.text.third, // Color of the icon
                  },
                  '&:hover .MuiButton-startIcon': {
                    color: muiTheme.palette.text.secondary, // Icon color on hover
                  },
                }}
              >
                Mon Compte
              </Button>

              {(userRole === 'admin' || userRole === 'employee') && (
                <Button
                  component={Link}
                  to="/admin"
                  startIcon={<AdminPanelSettingsIcon />}
                  variant="contained"
                  color="secondary"
                  sx={{
                    color: muiTheme.palette.text.third,
                    '& .MuiButton-startIcon': {
                      color: muiTheme.palette.text.third, // Color of the icon
                    },
                    '&:hover .MuiButton-startIcon': {
                      color: muiTheme.palette.text.secondary, // Icon color on hover
                    },
                  }}
                >
                  Administration
                </Button>
              )}
              <Button
                onClick={handleLogoutOpen}
                startIcon={<LogoutIcon />}
                variant="contained"
                color="secondary"
                sx={{
                  color: muiTheme.palette.text.third,
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
