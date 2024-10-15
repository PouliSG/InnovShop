import React, { useEffect, useState } from 'react'
import { getCategories, deleteCategories } from '../../services/apiService'
import { useNavigate } from 'react-router-dom'
import EnhancedTable from '../../components/EnhancedTable'
import { isAuthenticated, isAuthorized } from '../../services/authService'
import { useLoading } from '../../utils/context/loadingContext'
const CategoryAdmin = ({
  token,
  handleUnauthorizedAccess,
  handleSessionExpiration,
  handleSuccess,
  dataChanged,
}) => {
  const [categories, setCategories] = useState([])

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
    const fetchCategories = async () => {
      startLoading()
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Erreur lors du chargement des catégories', error)
      } finally {
        stopLoading()
      }
    }
    fetchCategories()
  }, [dataChanged])

  const handleDelete = async (categoryIds) => {
    startLoading()
    try {
      await deleteCategories(token, categoryIds)
      setCategories(
        categories.filter((category) => !categoryIds.includes(category._id))
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
    { id: 'name', numeric: false, disablePadding: false, label: 'Nom' },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'Description',
    },
    {
      id: 'createdAt',
      numeric: true,
      disablePadding: false,
      label: 'Date de création',
    },
  ]

  return (
    <EnhancedTable
      title="Catégories"
      headCells={headCells}
      rows={categories}
      handleDelete={handleDelete}
      onSuccess={handleSuccess}
    />
  )
}

export default CategoryAdmin
