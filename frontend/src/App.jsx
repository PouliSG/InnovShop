import { React, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { jwtDecode } from 'jwt-decode'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './components/Error'
import Home from './pages/Home'
import Login from './components/Login'
import Register from './components/Register'
import Product from './pages/Product'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
// import Dashboard from './pages/Dashboard'
// import OrderHistory from './pages/OrderHistory'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import ProductAdmin from './pages/admin/ProductAdmin'
import OrderAdmin from './pages/admin/OrderAdmin'
import UserAdmin from './pages/admin/UserAdmin'
import { useTheme } from './utils/context/themeContext'
import ThemedGlobalStyle from './utils/style/GlobalStyle'
import {
  ThemeProvider,
  CssBaseline,
  Modal,
  Box,
  Alert,
  Snackbar,
} from '@mui/material'
import { lightTheme, darkTheme } from './utils/theme'
import { CartProvider } from './utils/context/cartContext'
import { useSessionManager } from './utils/hooks/useSessionManager'
import { TOKEN_KEY } from './utils/constants'
import { logout, isAuthenticated } from './services/authService'

function App() {
  const { theme } = useTheme()
  const appliedTheme = theme === 'dark' ? darkTheme : lightTheme

  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || null)
  const [isLoginOpen, setLoginOpen] = useState(false)
  const [isRegisterOpen, setRegisterOpen] = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false)
  const [showSessionExpired, setShowSessionExpired] = useState(false)
  const [showUnauthorized, setShowUnauthorized] = useState(false)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const decodedToken = token ? jwtDecode(token) : null
    isAuthenticated() ? setUserRole(decodedToken.user.role) : setUserRole(null)
  }, [token])

  const handleLoginOpen = () => setLoginOpen(true)
  const handleLoginClose = () => setLoginOpen(false)
  const handleRegisterOpen = () => setRegisterOpen(true)
  const handleRegisterClose = () => setRegisterOpen(false)

  const handleLoginSuccess = (userToken) => {
    setToken(userToken) // Store the token globally
    setShowSuccess(true) // Trigger the success alert
    setTimeout(() => setShowSuccess(false), 3000) // Hide the alert after 3 seconds
    handleLoginClose() // Close the modal after login
  }

  const handleLogout = () => {
    logout() // Clear the token from localStorage
    setToken(null) // Reset the token in the app state
    setShowLogoutSuccess(true) // Trigger the success alert for logout
    setTimeout(() => setShowLogoutSuccess(false), 3000) // Hide the alert after 3 seconds
  }

  // Fonction pour gérer la déconnexion si le token est expiré
  const handleSessionExpiration = () => {
    setShowSessionExpired(true) // Afficher l'alerte de session expirée
    setTimeout(() => setShowSessionExpired(false), 3000) // Masquer l'alerte après 3 secondes
    // Supprimer le token du localStorage
    localStorage.removeItem(TOKEN_KEY)
    setSessionExpired(true)
    setLoginOpen(true) // Ouvrir la popup de connexion
  }

  //Fonction pour gérer l'affichage d'alerte après restrictions d'accès aux pages
  const handleUnauthorizedAccess = () => {
    setShowUnauthorized(true) // Afficher l'alerte de session expirée
    setTimeout(() => setShowUnauthorized(false), 3000) // Masquer l'alerte après 3 secondes
  }

  const { handleSessionExpired } = useSessionManager(handleLoginOpen)

  return (
    <ThemeProvider theme={appliedTheme}>
      <CartProvider>
        <CssBaseline />
        <ThemedGlobalStyle />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Header
              handleLoginOpen={handleLoginOpen}
              handleRegisterOpen={handleRegisterOpen}
              onLogout={handleLogout}
              isLoggedIn={isAuthenticated()}
              userRole={userRole}
            />
            <Snackbar
              open={showSuccess}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              autoHideDuration={3000}
              onClose={() => setShowSuccess(false)}
            >
              <Alert severity="success" onClose={() => setShowSuccess(false)}>
                Connexion réussie !
              </Alert>
            </Snackbar>

            <Snackbar
              open={showLogoutSuccess}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              autoHideDuration={3000}
              onClose={() => setShowLogoutSuccess(false)}
            >
              <Alert
                severity="success"
                onClose={() => setShowLogoutSuccess(false)}
              >
                Déconnexion réussie !
              </Alert>
            </Snackbar>

            <Snackbar
              open={showSessionExpired}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              autoHideDuration={3000}
              onClose={() => setShowSessionExpired(false)}
            >
              <Alert
                severity="warning"
                onClose={() => setShowSessionExpired(false)}
              >
                Votre session a expiré. Veuillez vous reconnecter.
              </Alert>
            </Snackbar>

            <Snackbar
              open={showUnauthorized}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              autoHideDuration={3000}
              onClose={() => setShowUnauthorized(false)}
            >
              <Alert
                severity="error"
                onClose={() => setShowUnauthorized(false)}
              >
                Accès non autorisé
              </Alert>
            </Snackbar>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <Checkout handleSessionExpiration={handleSessionExpiration} />
                }
              />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />
              {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order-history" element={<OrderHistory />} /> */}
              <Route
                path="/admin"
                element={
                  <DashboardAdmin
                    userRole={userRole}
                    isLoggedIn={isAuthenticated()}
                    handleUnauthorizedAccess={handleUnauthorizedAccess}
                    handleSessionExpiration={handleSessionExpiration}
                  />
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProductAdmin
                    token={token}
                    userRole={userRole}
                    isLoggedIn={isAuthenticated()}
                    handleUnauthorizedAccess={handleUnauthorizedAccess}
                    handleSessionExpiration={handleSessionExpiration}
                  />
                }
              />
              {/* <Route
                path="/admin/categories"
                element={
                  <CategoryAdmin
                    token={token}
                    userRole={userRole}
                    isLoggedIn={isAuthenticated()}
                    handleUnauthorizedAccess={handleUnauthorizedAccess}
                    handleSessionExpiration={handleSessionExpiration}
                  />
                }
              /> */}
              <Route
                path="/admin/orders"
                element={
                  <OrderAdmin
                    token={token}
                    userRole={userRole}
                    isLoggedIn={isAuthenticated()}
                    handleUnauthorizedAccess={handleUnauthorizedAccess}
                    handleSessionExpiration={handleSessionExpiration}
                  />
                }
              />
              <Route
                path="/admin/users"
                element={
                  <UserAdmin
                    token={token}
                    userRole={userRole}
                    isLoggedIn={isAuthenticated()}
                    handleUnauthorizedAccess={handleUnauthorizedAccess}
                    handleSessionExpiration={handleSessionExpiration}
                  />
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />

            {/* Login Modal */}
            <Modal open={isLoginOpen} onClose={handleLoginClose}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <Login
                  handleClose={handleLoginClose}
                  onLoginSuccess={handleLoginSuccess}
                />
              </Box>
            </Modal>

            {/* Register Modal */}
            <Modal open={isRegisterOpen} onClose={handleRegisterClose}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <Register handleClose={handleRegisterClose} />
              </Box>
            </Modal>
          </Router>
        </LocalizationProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
