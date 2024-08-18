import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './components/Product'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import OrderHistory from './pages/OrderHistory'
import ManageProducts from './pages/Admin/ManageProducts'
import ManageOrders from './pages/Admin/ManageOrders'
import ManageUsers from './pages/Admin/ManageUsers'
import { ThemeProvider } from './utils/context'
import ThemedGlobalStyle from './utils/style/GlobalStyle'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ThemedGlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products/:page" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/:step" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  )
}

export default App
