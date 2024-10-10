import React, { useEffect, useState } from 'react'
import { getCategories, deleteCategories } from '../../services/apiService'
import { useNavigate } from 'react-router-dom'
import EnhancedTable from '../../components/EnhancedTable'

const CategoryAdmin = ({
  token,
  userRole,
  isLoggedIn,
  handleUnauthorizedAccess,
  handleSessionExpiration,
  handleSuccess,
}) => {
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()

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
    if (!isLoggedIn) {
      handleUnauthenticated() // Open login modal if not authenticated
    }
  }, [isLoggedIn])

  useEffect(() => {
    // Check if the user is authenticated
    if (!['admin', 'employee'].includes(userRole)) {
      handleUnauthorized() // Open login modal if not authenticated
    }
  }, [userRole])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Erreur lors du chargement des catégories', error)
      }
    }
    fetchCategories()
  }, [])

  const handleDelete = async (categoryIds) => {
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
