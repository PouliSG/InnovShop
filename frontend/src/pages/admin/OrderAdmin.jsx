import React, { useEffect, useState } from 'react'
import { getOrders, updateOrderStatus } from '../../services/apiService'
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
import { TOKEN_KEY } from '../../utils/constants'

const OrderAdmin = () => {
  const [orders, setOrders] = useState([])
  const token = localStorage.getItem(TOKEN_KEY)

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders(token)
      setOrders(data)
    }
    fetchOrders()
  }, [])

  const handleStatusUpdate = async (orderId) => {
    await updateOrderStatus(orderId, { status: 'expédiée' })
    setOrders(
      orders.map((order) =>
        order._id === orderId ? { ...order, status: 'expédiée' } : order
      )
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des commandes
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Numéro de commande</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleStatusUpdate(order._id)}
                  disabled={order.status === 'expédiée'}
                >
                  Marquer comme expédiée
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default OrderAdmin
