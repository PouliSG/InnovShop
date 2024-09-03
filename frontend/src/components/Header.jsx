import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/system'
import HomeIcon from '@mui/icons-material/Home'
import StorefrontIcon from '@mui/icons-material/Storefront'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import darkLogo from '../assets/InnovShop_logo_dark.png'
import lightLogo from '../assets/InnovShop_logo_light.png'
import { useTheme } from '../utils/context'

const Logo = styled('img')({
  height: '100px', // Ajustez selon votre design
})

function Header() {
  const { theme } = useTheme()

  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Logo src={theme === 'dark' ? darkLogo : lightLogo} alt="Logo" />
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
          InnovShop - Explorez l'innovation, chaque jour.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            variant="text"
            color="inherit"
          >
            Accueil
          </Button>
          <Button
            component={Link}
            to="/products/1"
            startIcon={<StorefrontIcon />}
            variant="text"
            color="inherit"
          >
            Nos Produits
          </Button>
          <Button
            component={Link}
            to="/login"
            startIcon={<LoginIcon />}
            variant="contained"
            color="primary"
          >
            Connexion
          </Button>
          <Button
            component={Link}
            to="/register"
            startIcon={<PersonAddIcon />}
            variant="contained"
            color="primary"
          >
            Créer un compte
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
