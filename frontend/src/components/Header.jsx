import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { styled } from '@mui/system'
import HomeIcon from '@mui/icons-material/Home'
import StorefrontIcon from '@mui/icons-material/Storefront'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import darkLogo from '../assets/InnovShop_logo_dark.png'
import lightLogo from '../assets/InnovShop_logo_light.png'
import { useTheme as useMUITheme } from '@mui/material/styles'
import { isAuthenticated } from '../services/authService'
import { getUserRole } from '../services/apiService'

const Logo = styled('img')({
  height: '100px',
})

function Header({ handleLoginOpen, handleRegisterOpen }) {
  const muiTheme = useMUITheme()

  const isLoggedIn = isAuthenticated()
  const userRole = isLoggedIn ? getUserRole() : null

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
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
