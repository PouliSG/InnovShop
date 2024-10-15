import { React, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { jwtDecode } from 'jwt-decode'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './components/Error'
import Login from './components/Login'
import Register from './components/Register'
import DataFormModal from './components/DataFormModal'
import Home from './pages/Home'
import Product from './pages/Product'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Dashboard from './pages/Account/Dashboard'
import OrderHistory from './pages/Account/OrderHistory'
import Profile from './pages/Account/Profile'
import Addresses from './pages/Account/Addresses'
import Settings from './pages/Account/Settings'
import DashboardAdmin from './pages/Admin/DashboardAdmin'
import CategoryAdmin from './pages/Admin/CategoryAdmin'
import OrderAdmin from './pages/Admin/OrderAdmin'
import ProductAdmin from './pages/Admin/ProductAdmin'
import UserAdmin from './pages/Admin/UserAdmin'
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
import { LoadingProvider } from './utils/context/loadingContext'
import { TOKEN_KEY } from './utils/constants'
import { logout, isAuthenticated } from './services/authService'
import * as apiService from './services/apiService'
import { useLoading } from './utils/context/loadingContext'
import { CircularProgress, Backdrop } from '@mui/material'

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
  const [showGenericSuccess, setShowGenericSuccess] = useState(false)
  const [userRole, setUserRole] = useState(null)

  const [dataChanged, setDataChanged] = useState(false)

  const handleDataChanged = () => {
    setDataChanged(!dataChanged) // Inverse la valeur pour déclencher useEffect
  }

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

  //Fonction pour gérer l'affichage d'alerte générique
  const handleGenericSuccess = () => {
    handleDataChanged()
    setShowGenericSuccess(true) // Afficher l'alerte de session expirée
    setTimeout(() => setShowGenericSuccess(false), 3000) // Masquer l'alerte après 3 secondes
  }

  const { handleSessionExpired } = useSessionManager(handleLoginOpen)

  return (
    <ThemeProvider theme={appliedTheme} token={token}>
      <LoadingProvider>
        <CartProvider>
          <CssBaseline />
          <ThemedGlobalStyle />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router>
              <AppContent
                token={token}
                userRole={userRole}
                isLoginOpen={isLoginOpen}
                isRegisterOpen={isRegisterOpen}
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                showLogoutSuccess={showLogoutSuccess}
                setShowLogoutSuccess={setShowLogoutSuccess}
                showSessionExpired={showSessionExpired}
                setShowSessionExpired={setShowSessionExpired}
                showUnauthorized={showUnauthorized}
                setShowUnauthorized={setShowUnauthorized}
                showGenericSuccess={showGenericSuccess}
                setShowGenericSuccess={setShowGenericSuccess}
                handleLoginOpen={handleLoginOpen}
                handleLoginClose={handleLoginClose}
                handleRegisterOpen={handleRegisterOpen}
                handleRegisterClose={handleRegisterClose}
                handleLoginSuccess={handleLoginSuccess}
                handleLogout={handleLogout}
                handleSessionExpiration={handleSessionExpiration}
                handleUnauthorizedAccess={handleUnauthorizedAccess}
                handleGenericSuccess={handleGenericSuccess}
                dataChanged={dataChanged}
              />
            </Router>
          </LocalizationProvider>
        </CartProvider>
      </LoadingProvider>
    </ThemeProvider>
  )
}

function AppContent(props) {
  const {
    token,
    userRole,
    isLoginOpen,
    isRegisterOpen,
    showSuccess,
    setShowSuccess,
    showLogoutSuccess,
    setShowLogoutSuccess,
    showSessionExpired,
    setShowSessionExpired,
    showUnauthorized,
    setShowUnauthorized,
    showGenericSuccess,
    setShowGenericSuccess,
    handleLoginOpen,
    handleLoginClose,
    handleRegisterOpen,
    handleRegisterClose,
    handleLoginSuccess,
    handleLogout,
    handleSessionExpiration,
    handleUnauthorizedAccess,
    handleGenericSuccess,
    dataChanged,
  } = props

  const location = useLocation()
  const state = location.state
  const navigate = useNavigate()
  const { isLoading } = useLoading()

  // Vérifiez si la route actuelle correspond à une modal
  const isProductModalOpen =
    /^\/admin\/products\/(?:add|edit)(?:\/[\w-]+)?$/.test(location.pathname)
  const isCategoryModalOpen =
    /^\/admin\/categories\/(?:add|edit)(?:\/[\w-]+)?$/.test(location.pathname)
  const isOrderModalOpen = /^\/admin\/orders\/(?:add|edit)(?:\/[\w-]+)?$/.test(
    location.pathname
  )
  const isUserModalOpen = /^\/admin\/users\/(?:add|edit)(?:\/[\w-]+)?$/.test(
    location.pathname
  )
  const isAdressModalOpen =
    /^\/account\/addresses\/(?:add|edit)(?:\/[\w-]+)?$/.test(location.pathname)

  return (
    <>
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
        <Alert severity="success" onClose={() => setShowLogoutSuccess(false)}>
          Déconnexion réussie !
        </Alert>
      </Snackbar>

      <Snackbar
        open={showSessionExpired}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setShowSessionExpired(false)}
      >
        <Alert severity="warning" onClose={() => setShowSessionExpired(false)}>
          Votre session a expiré. Veuillez vous reconnecter.
        </Alert>
      </Snackbar>

      <Snackbar
        open={showUnauthorized}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setShowUnauthorized(false)}
      >
        <Alert severity="error" onClose={() => setShowUnauthorized(false)}>
          Accès non autorisé
        </Alert>
      </Snackbar>

      <Snackbar
        open={showGenericSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setShowGenericSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowGenericSuccess(false)}>
          Opération réussie !
        </Alert>
      </Snackbar>

      {/* Afficher le loader global */}
      <Backdrop
        open={isLoading}
        sx={{ color: 'primary', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="secondary" size={60} />
      </Backdrop>

      <Routes location={state?.backgroundLocation || location}>
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
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route
          path="/account"
          element={
            <Dashboard
              token={token}
              handleSessionExpiration={handleSessionExpiration}
              isLoggedIn={isAuthenticated()}
              handleUnauthorizedAccess={handleUnauthorizedAccess}
            />
          }
        />
        <Route
          path="/account/orders"
          element={
            <OrderHistory
              token={token}
              handleSessionExpiration={handleSessionExpiration}
              isLoggedIn={isAuthenticated()}
              handleUnauthorizedAccess={handleUnauthorizedAccess}
            />
          }
        />
        <Route
          path="/account/profile"
          element={
            <Profile
              token={token}
              handleSessionExpiration={handleSessionExpiration}
              isLoggedIn={isAuthenticated()}
              handleUnauthorizedAccess={handleUnauthorizedAccess}
              handleSuccess={handleGenericSuccess}
            />
          }
        />
        <Route
          path="/account/addresses"
          element={
            <Addresses
              token={token}
              handleSessionExpiration={handleSessionExpiration}
              isLoggedIn={isAuthenticated()}
              handleUnauthorizedAccess={handleUnauthorizedAccess}
              handleSuccess={handleGenericSuccess}
              dataChanged={dataChanged}
            />
          }
        />
        <Route
          path="/account/settings"
          element={
            <Settings
              token={token}
              handleSessionExpiration={handleSessionExpiration}
              isLoggedIn={isAuthenticated()}
              handleUnauthorizedAccess={handleUnauthorizedAccess}
              handleSuccess={handleGenericSuccess}
            />
          }
        />
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
              handleSuccess={handleGenericSuccess}
              dataChanged={dataChanged}
            />
          }
        />
        <Route
          path="/admin/categories"
          element={
            <CategoryAdmin
              token={token}
              userRole={userRole}
              isLoggedIn={isAuthenticated()}
              handleUnauthorizedAccess={handleUnauthorizedAccess}
              handleSessionExpiration={handleSessionExpiration}
              handleSuccess={handleGenericSuccess}
              dataChanged={dataChanged}
            />
          }
        />
        <Route
          path="/admin/orders"
          element={
            <OrderAdmin
              token={token}
              userRole={userRole}
              isLoggedIn={isAuthenticated()}
              handleUnauthorizedAccess={handleUnauthorizedAccess}
              handleSessionExpiration={handleSessionExpiration}
              handleSuccess={handleGenericSuccess}
              dataChanged={dataChanged}
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
              handleSuccess={handleGenericSuccess}
              dataChanged={dataChanged}
            />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/account/addresses/add"
            element={
              isAdressModalOpen && (
                <DataFormModal
                  token={token}
                  onClose={() => navigate(-1)}
                  handleSuccess={handleGenericSuccess}
                  handleSessionExpiration={handleSessionExpiration}
                  dataType={'adresse'}
                  addMethod={apiService.addUserAddress}
                  updateMethod={apiService.updateAddress}
                  getByIdMethod={apiService.getAddressById}
                />
              )
            }
          />
          <Route
            path="/account/addresses/edit/:id"
            element={
              isAdressModalOpen && (
                <DataFormModal
                  token={token}
                  onClose={() => navigate(-1)}
                  handleSuccess={handleGenericSuccess}
                  handleSessionExpiration={handleSessionExpiration}
                  dataType={'adresse'}
                  addMethod={apiService.addUserAddress}
                  updateMethod={apiService.updateAddress}
                  getByIdMethod={apiService.getAddressById}
                />
              )
            }
          />
          {/* Route pour l'ajout de produit */}
          <Route
            path="/admin/products/add"
            element={
              isProductModalOpen && (
                <DataFormModal
                  token={token}
                  onClose={() => navigate(-1)}
                  handleSuccess={handleGenericSuccess}
                  handleSessionExpiration={handleSessionExpiration}
                  dataType={'produit'}
                  addMethod={apiService.addProduct}
                  updateMethod={apiService.updateProduct}
                  getByIdMethod={apiService.getProductById}
                />
              )
            }
          />
          {/* Route pour l'édition de produit */}
          <Route
            path="/admin/products/edit/:id"
            element={
              isProductModalOpen && (
                <DataFormModal
                  token={token}
                  onClose={() => navigate(-1)}
                  handleSuccess={handleGenericSuccess}
                  handleSessionExpiration={handleSessionExpiration}
                  dataType={'produit'}
                  addMethod={apiService.addProduct}
                  updateMethod={apiService.updateProduct}
                  getByIdMethod={apiService.getProductById}
                />
              )
            }
          />
          {/* Route pour l'ajout de catégorie */}
          <Route
            path="/admin/categories/add"
            element={
              isCategoryModalOpen && (
                <DataFormModal
                  token={token}
                  onClose={() => navigate(-1)}
                  handleSuccess={handleGenericSuccess}
                  handleSessionExpiration={handleSessionExpiration}
                  dataType={'catégorie'}
                  addMethod={apiService.addCategory}
                  updateMethod={apiService.updateCategory}
                  getByIdMethod={apiService.getCategoryById}
                />
              )
            }
          />
          {/* Route pour l'édition de catégorie */}
          <Route
            path="/admin/categories/edit/:id"
            element={
              isCategoryModalOpen && (
                <DataFormModal
                  token={token}
                  onClose={() => navigate(-1)}
                  handleSuccess={handleGenericSuccess}
                  handleSessionExpiration={handleSessionExpiration}
                  dataType={'catégorie'}
                  addMethod={apiService.addCategory}
                  updateMethod={apiService.updateCategory}
                  getByIdMethod={apiService.getCategoryById}
                />
              )
            }
          />
          {/* Route pour l'ajout de commande */}
          <Route
            path="/admin/orders/add"
            element={
              isOrderModalOpen && (
                <DataFormModal
                  token={token}
                  onClose={() => navigate(-1)}
                  handleSuccess={handleGenericSuccess}
                  handleSessionExpiration={handleSessionExpiration}
                  dataType={'commande'}
                  addMethod={apiService.placeOrder}
                  updateMethod={apiService.updateOrder}
                  getByIdMethod={apiService.getOrderById}
                />
              )
            }
          />
          {/* Route pour l'édition de commande */}
          <Route
            path="/admin/orders/edit/:id"
            element={
              isOrderModalOpen && (
                <DataFormModal
                  token={token}
                  onClose={() => navigate(-1)}
                  handleSuccess={handleGenericSuccess}
                  handleSessionExpiration={handleSessionExpiration}
                  dataType={'commande'}
                  addMethod={apiService.placeOrder}
                  updateMethod={apiService.updateOrder}
                  getByIdMethod={apiService.getOrderById}
                />
              )
            }
          />
          {/* Route pour l'ajout d'utilisateur */}
          <Route
            path="/admin/users/add"
            element={
              isUserModalOpen && (
                <DataFormModal
                  token={token}
                  onClose={() => navigate(-1)}
                  handleSuccess={handleGenericSuccess}
                  handleSessionExpiration={handleSessionExpiration}
                  dataType={'utilisateur'}
                  addMethod={apiService.addUser}
                  updateMethod={apiService.updateUser}
                  getByIdMethod={apiService.getUserById}
                />
              )
            }
          />
          {/* Route pour l'édition d'utilisateur */}
          <Route
            path="/admin/users/edit/:id"
            element={
              isUserModalOpen && (
                <DataFormModal
                  token={token}
                  onClose={() => navigate(-1)}
                  handleSuccess={handleGenericSuccess}
                  handleSessionExpiration={handleSessionExpiration}
                  dataType={'utilisateur'}
                  addMethod={apiService.addUser}
                  updateMethod={apiService.updateUser}
                  getByIdMethod={apiService.getUserById}
                />
              )
            }
          />
        </Routes>
      )}
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
    </>
  )
}

export default App
