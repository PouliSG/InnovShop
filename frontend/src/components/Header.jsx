import { Link } from 'react-router-dom'
import styled from 'styled-components'
import darkLogo from '../assets/InnovShop_logo_dark_small.png'
import lightLogo from '../assets/InnovShop_logo_light_small.png'
import { useTheme } from '../utils/context'

const StyledLink = styled(Link)`
  padding: 15px;
  color: --primary-color;
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `color: --background-color; border-radius: 30px; background-color: --primary-color;`}

  // &:hover {
  //   color: --background-color;
  //   border-radius: 30px;
  //   background-color: --secondary-color;
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: --background-color;
`
const Logo = styled.img`
  height: 100px; /* Adjust according to your design */
`

const NavLinks = styled.div`
  display: flex;
  gap: 20px; /* Adjust according to your design */
`

function Header() {
  const { theme } = useTheme()

  return (
    <Nav>
      <Logo src={theme === 'dark' ? darkLogo : lightLogo} alt="Logo" />
      <NavLinks>
        <StyledLink to="/">Accueil</StyledLink>
        <StyledLink to="/products/1">Nos Produits</StyledLink>
        <StyledLink to="/login" $isFullLink>
          Connexion
        </StyledLink>
        <StyledLink to="/register" $isFullLink>
          Créer un compte
        </StyledLink>
      </NavLinks>
    </Nav>
  )
}

export default Header
