import React, { useEffect, useState } from 'react'
import { getUsers, deleteUser } from '../../services/apiService'
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
import { Link, useNavigate } from 'react-router-dom'

const UserAdmin = ({
  token,
  userRole,
  isLoggedIn,
  handleUnauthorizedAccess,
  handleSessionExpiration,
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
      const data = await getUsers(token)
      setUsers(data)
    }
    fetchUsers()
  }, [])

  const handleDelete = async (userId) => {
    await deleteUser(userId)
    setUsers(users.filter((user) => user._id !== userId))
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des utilisateurs
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  variant="outlined"
                  sx={{ mr: 2 }}
                  onClick={() => handleDelete(user._id)}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default UserAdmin
