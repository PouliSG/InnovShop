import { React, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
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
// import ManageProducts from './pages/Admin/ManageProducts'
// import ManageOrders from './pages/Admin/ManageOrders'
// import ManageUsers from './pages/Admin/ManageUsers'
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
import { TOKEN_KEY } from './constants'
import { logout } from './services/authService'

function App() {
  const { theme } = useTheme()
  const appliedTheme = theme === 'dark' ? darkTheme : lightTheme

  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || null)
  const [isLoginOpen, setLoginOpen] = useState(false)
  const [isRegisterOpen, setRegisterOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false)

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
              token={token}
              setToken={setToken}
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

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />
              {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/admin/users" element={<ManageUsers />} /> */}
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
