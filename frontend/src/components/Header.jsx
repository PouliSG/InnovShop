import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { styled } from '@mui/system'
import HomeIcon from '@mui/icons-material/Home'
import StorefrontIcon from '@mui/icons-material/Storefront'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import darkLogo from '../assets/InnovShop_logo_dark.png'
import lightLogo from '../assets/InnovShop_logo_light.png'
import { useTheme } from '../utils/context'
import { useTheme as useMUITheme } from '@mui/material/styles'

const Logo = styled('img')({
  height: '100px', // Adjust according to your design
})

function Header() {
  const { theme } = useTheme()
  const logo = theme === 'dark' ? darkLogo : lightLogo

  const muiTheme = useMUITheme()

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: muiTheme.palette.background.default }}
    >
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Logo src={logo} alt="Logo" />
        <Typography variant="body2">
          InnovShop - Explorez l'innovation, chaque jour.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            variant="text"
            sx={{ color: muiTheme.palette.text.primary }}
          >
            Accueil
          </Button>
          <Button
            component={Link}
            to="/products/1"
            startIcon={<StorefrontIcon />}
            variant="text"
            sx={{ color: muiTheme.palette.text.primary }}
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
