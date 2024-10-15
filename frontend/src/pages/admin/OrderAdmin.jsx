import React, { useEffect, useState } from 'react'
import {
  getOrders,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrders,
} from '../../services/apiService'
import EnhancedTable from '../../components/EnhancedTable'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated, isAuthorized } from '../../services/authService'
import { useLoading } from '../../utils/context/loadingContext'

const OrderAdmin = ({
  token,
  handleUnauthorizedAccess,
  handleSessionExpiration,
  handleSuccess,
  dataChanged,
}) => {
  const [orders, setOrders] = useState([])
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
    const fetchOrders = async () => {
      startLoading()
      try {
        const data = await getOrders(token)
        setOrders(data)
      } catch (error) {
        if (error.sessionExpired) {
          handleUnauthenticated() // Gérer la session expirée
        } else {
          console.error('Erreur lors du chargement des commandes', error)
        }
      } finally {
        stopLoading()
      }
    }
    fetchOrders()
  }, [dataChanged])

  const handleStatusUpdate = async (orderId, status) => {
    startLoading()
    try {
      await updateOrderStatus(token, orderId, status)
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      )
    } catch (error) {
      if (error.sessionExpired) {
        handleUnauthenticated() // Gérer la session expirée
      } else {
        console.error(
          'Erreur lors de la mise à jour du statut de la commande',
          error
        )
      }
    } finally {
      stopLoading()
    }
  }

  const handlePaymentUpdate = async (orderId, paymentStatus) => {
    startLoading()
    try {
      await updatePaymentStatus(token, orderId, paymentStatus)
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, paymentStatus } : order
        )
      )
    } catch (error) {
      if (error.sessionExpired) {
        handleUnauthenticated() // Gérer la session expirée
      } else {
        console.error(
          'Erreur lors de la mise à jour du statut de paiement de la commande',
          error
        )
      }
    } finally {
      stopLoading()
    }
  }

  const handleDelete = async (orderIds) => {
    startLoading()
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
    } finally {
      stopLoading()
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
      handleUpdateStatus={handleStatusUpdate}
      handleUpdatePayment={handlePaymentUpdate}
    />
  )
}

export default OrderAdmin
