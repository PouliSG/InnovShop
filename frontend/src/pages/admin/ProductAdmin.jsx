import React, { useEffect, useState } from 'react'
import { getProducts, deleteProducts } from '../../services/apiService'
import { useNavigate } from 'react-router-dom'
import EnhancedTable from '../../components/EnhancedTable'
import { isAuthenticated, isAuthorized } from '../../services/authService'
import { useLoading } from '../../utils/context/LoadingContext'

const ProductAdmin = ({
  token,
  handleUnauthorizedAccess,
  handleSessionExpiration,
  handleSuccess,
  dataChanged,
}) => {
  const [products, setProducts] = useState([])

  const navigate = useNavigate()
  const { startLoading, stopLoading } = useLoading()

  const handleUnauthenticated = () => {
    handleSessionExpiration()
    navigate('/')
  }

  const handleUnauthorized = () => {
    handleUnauthorizedAccess()
    navigate('/')
  }

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated()) {
      handleUnauthenticated() // Open login modal if not authenticated
    }
  }, [])

  useEffect(() => {
    // Check if the user is authorized
    if (!isAuthorized('employee')) {
      handleUnauthorized() // Open login modal if not authorized
    }
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      startLoading()
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Erreur lors du chargement des produits', error)
      } finally {
        stopLoading()
      }
    }
    fetchProducts()
  }, [dataChanged])

  const handleDelete = async (productIds) => {
    startLoading()
    try {
      await deleteProducts(token, productIds)
      setProducts(
        products.filter((product) => !productIds.includes(product._id))
      )
      handleSuccess()
    } catch (error) {
      if (error.sessionExpired) {
        handleUnauthenticated() // Gérer la session expirée
      } else {
        console.error('Erreur lors de la suppression du produit', error)
      }
    } finally {
      stopLoading()
    }
  }

  const headCells = [
    { id: 'image', numeric: false, disablePadding: false, label: 'Image' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Nom' },
    { id: 'brand', numeric: false, disablePadding: false, label: 'Marque' },
    {
      id: 'category',
      numeric: false,
      disablePadding: false,
      label: 'Catégorie',
      value: (option) => option.name,
    },
    { id: 'stock', numeric: true, disablePadding: false, label: 'Stock' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Prix' },
    {
      id: 'createdAt',
      numeric: true,
      disablePadding: false,
      label: 'Date de création',
    },
  ]

  return (
    <EnhancedTable
      title="Produits"
      headCells={headCells}
      rows={products}
      handleDelete={handleDelete}
      onSuccess={handleSuccess}
    />
  )
}

export default ProductAdmin
