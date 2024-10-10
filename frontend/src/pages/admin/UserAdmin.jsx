import React, { useEffect, useState } from 'react'
import { getUsers, deleteUser } from '../../services/apiService'
import { useNavigate } from 'react-router-dom'
import EnhancedTable from '../../components/EnhancedTable'

const UserAdmin = ({
  token,
  userRole,
  isLoggedIn,
  handleUnauthorizedAccess,
  handleSessionExpiration,
  handleSuccess,
}) => {
  const [users, setUsers] = useState([])
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
    const fetchUsers = async () => {
      try {
        const data = await getUsers(token)
        setUsers(data)
      } catch (error) {
        if (error.sessionExpired) {
          handleUnauthenticated() // Gérer la session expirée
        } else {
          console.error('Erreur lors du chargement des utilisateurs', error)
        }
      }
    }
    fetchUsers()
  }, [])

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId)
      setUsers(users.filter((user) => user._id !== userId))
    } catch (error) {
      if (error.sessionExpired) {
        handleUnauthenticated() // Gérer la session expirée
      } else {
        console.error("Erreur lors de la suppression de l'utilisateur", error)
      }
    }
  }

  const headCells = [
    { id: 'firstname', numeric: false, disablePadding: false, label: 'Prénom' },
    { id: 'lastname', numeric: false, disablePadding: false, label: 'Nom' },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Adresse e-mail',
    },
    { id: 'role', numeric: false, disablePadding: false, label: 'Rôle' },
    {
      id: 'verified',
      numeric: false,
      disablePadding: false,
      label: 'Compte vérifié',
    },
    {
      id: 'active',
      numeric: false,
      disablePadding: false,
      label: 'Compte actif',
    },
    {
      id: 'signup_date',
      numeric: true,
      disablePadding: false,
      label: 'Date de création',
    },
    {
      id: 'last_login_date',
      numeric: true,
      disablePadding: false,
      label: 'Dernière connexion',
    },
    {
      id: 'newsletter_optin',
      numeric: false,
      disablePadding: false,
      label: 'Opt-in newsletter',
    },
  ]

  return (
    <EnhancedTable
      title="Utilisateurs"
      headCells={headCells}
      rows={users}
      handleDelete={handleDelete}
      onSuccess={handleSuccess}
    />
  )
}

export default UserAdmin
