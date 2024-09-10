import { React, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Product from './components/Product'
import Error from './components/Error'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './pages/Dashboard'
import OrderHistory from './pages/OrderHistory'
import ManageProducts from './pages/Admin/ManageProducts'
import ManageOrders from './pages/Admin/ManageOrders'
import ManageUsers from './pages/Admin/ManageUsers'
import { useTheme } from './utils/context'
import ThemedGlobalStyle from './utils/style/GlobalStyle'
import { ThemeProvider, CssBaseline, Modal, Box } from '@mui/material'
import { lightTheme, darkTheme } from './utils/theme'

function App() {
  const { theme } = useTheme()
  const appliedTheme = theme === 'dark' ? darkTheme : lightTheme

  const [isLoginOpen, setLoginOpen] = useState(false)
  const [isRegisterOpen, setRegisterOpen] = useState(false)

  const handleLoginOpen = () => setLoginOpen(true)
  const handleLoginClose = () => setLoginOpen(false)
  const handleRegisterOpen = () => setRegisterOpen(true)
  const handleRegisterClose = () => setRegisterOpen(false)

  return (
    <ThemeProvider theme={appliedTheme}>
      <Router>
        <CssBaseline />
        <ThemedGlobalStyle />
        <Header
          handleLoginOpen={handleLoginOpen}
          handleRegisterOpen={handleRegisterOpen}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/details/:id" element={<Product />} />
          <Route path="/products/:page" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/:step" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />

        {/* Login Modal */}
        <Modal open={isLoginOpen} onClose={handleLoginClose}>
          <Box
            sx={
              {
                /* Add styling for modal box here */
              }
            }
          >
            <Login />
          </Box>
        </Modal>

        {/* Register Modal */}
        <Modal open={isRegisterOpen} onClose={handleRegisterClose}>
          <Box
            sx={
              {
                /* Add styling for modal box here */
              }
            }
          >
            <Register />
          </Box>
        </Modal>
      </Router>
    </ThemeProvider>
  )
}

export default App
