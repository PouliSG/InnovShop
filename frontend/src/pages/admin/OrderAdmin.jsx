import React, { useEffect, useState } from 'react'
import {
  getOrders,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrders,
} from '../../services/apiService'
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import EnhancedTable from '../../components/EnhancedTable'
import { useNavigate } from 'react-router-dom'

const OrderAdmin = ({
  token,
  isLoggedIn,
  userRole,
  handleUnauthorizedAccess,
  handleSessionExpiration,
  handleSuccess,
}) => {
  const [orders, setOrders] = useState([])
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
    const fetchOrders = async () => {
      try {
        const data = await getOrders(token)
        setOrders(data)
      } catch (error) {
        if (error.sessionExpired) {
          handleUnauthenticated() // Gérer la session expirée
        } else {
          console.error('Erreur lors du chargement des commandes', error)
        }
      }
    }
    fetchOrders()
  }, [])

  const handleStatusUpdate = async (orderId) => {
    try {
      await updateOrderStatus(orderId, { status: 'expédiée' })
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: 'expédiée' } : order
        )
      )
    } catch (error) {
      if (error.sessionExpired) {
        handleUnauthenticated() // Gérer la session expirée
      } else {
        console.error(
          'Erreur lors de la mise à jour du status de la commande',
          error
        )
      }
    }
  }

  const handleDelete = async (orderIds) => {
    try {
      await deleteOrders(token, orderIds)
      setOrders(orders.filter((order) => !orderIds.includes(order._id)))
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
    {
      id: '_id',
      numeric: false,
      disablePadding: false,
      label: 'ID de commande',
    },
    {
      id: 'user',
      numeric: false,
      disablePadding: false,
      label: 'Utilisateur',
      value: (user) => `${user.firstname} ${user.lastname}`,
    },
    {
      id: 'products',
      numeric: false,
      disablePadding: false,
      label: 'Articles',
      value: (products) =>
        products.reduce((acc, product) => acc + product.quantity, 0),
    },
    {
      id: 'totalPrice',
      numeric: true,
      disablePadding: false,
      label: 'Prix total (€)',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Statut',
    },
    {
      id: 'paymentStatus',
      numeric: false,
      disablePadding: false,
      label: 'Statut de paiement',
    },
    {
      id: 'createdAt',
      numeric: true,
      disablePadding: false,
      label: 'Date de création',
    },
    {
      id: 'statusChangedAt',
      numeric: true,
      disablePadding: false,
      label: 'Date ch. statut',
    },
    {
      id: 'paymentStatusChangedAt',
      numeric: true,
      disablePadding: false,
      label: 'Date ch. statut paiement',
    },
  ]

  return (
    <EnhancedTable
      title="Commandes"
      headCells={headCells}
      rows={orders}
      handleDelete={handleDelete}
      onSuccess={handleSuccess}
    />
  )
}

export default OrderAdmin
