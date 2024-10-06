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
import { TOKEN_KEY } from '../../utils/constants'

const UserAdmin = () => {
  const [users, setUsers] = useState([])
  const token = localStorage.getItem(TOKEN_KEY)

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
                <Button color="error" onClick={() => handleDelete(user._id)}>
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
