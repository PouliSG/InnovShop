import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import { getUserOrders } from '../../services/apiService'
import { useLoading } from '../../utils/context/LoadingContext'

function OrderHistory({ token, handleSessionExpiration }) {
  const [orders, setOrders] = useState([])
  const { startLoading, stopLoading } = useLoading()

  useEffect(() => {
    const fetchOrders = async () => {
      startLoading()
      try {
        const data = await getUserOrders(token)
        setOrders(data)
      } catch (error) {
        if (error.sessionExpired) {
          handleSessionExpiration()
        } else {
          console.error('Erreur lors de la récupération des commandes :', error)
        }
      } finally {
        stopLoading()
      }
    }
    fetchOrders()
  }, [token])

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mes commandes
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID de commande</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Total (€)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.totalPrice.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default OrderHistory
