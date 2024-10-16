import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Button, TextField, Box, IconButton, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'
import { login } from '../services/authService'
import { getUserSettings } from '../services/apiService'
import {
  TOKEN_KEY,
  SETTINGS_KEY,
  USER_ROLE_KEY,
  EXPIRES_IN_KEY,
} from '../utils/constants'

function Login({ handleClose, onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const muiTheme = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login(email, password)
      const token = response.token
      localStorage.setItem(TOKEN_KEY, token)
      const decodedToken = jwtDecode(token)
      localStorage.setItem(USER_ROLE_KEY, decodedToken.user.role)
      localStorage.setItem(EXPIRES_IN_KEY, decodedToken.exp)

      const settings = await getUserSettings(token)
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
      onLoginSuccess(token) // Send token up to parent
      handleClose() // Close the popup
    } catch (err) {
      setError(err.msg)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: 'background.paper',
        padding: 4,
        borderRadius: 2,
        width: 400, // Control the width of the popup
        margin: 'auto', // Center it horizontally
        position: 'relative', // Set relative position for the close button
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose} // Close modal on click
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          color: muiTheme.palette.secondary,
          '&:hover': {
            color: muiTheme.palette.third, // Change color on hover
          },
          '& .MuiButton-startIcon': {
            color: muiTheme.palette.secondary, // Color of the icon
          },
          '&:hover .MuiButton-startIcon': {
            color: muiTheme.palette.third, // Icon color on hover
          },
        }}
      >
        <CloseIcon />
      </IconButton>
      <TextField
        label="Adresse email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Mot de passe"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />
      {error && (
        <Typography sx={{ color: 'red' }} variant="body2">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        startIcon={<LoginIcon />}
        variant="contained"
        color="primary"
        sx={{
          color: muiTheme.palette.text.third,
          '&:hover': {
            color: muiTheme.palette.text.secondary, // Change text color on hover
          },
          '& .MuiButton-startIcon': {
            color: muiTheme.palette.text.third, // Color of the icon
          },
          '&:hover .MuiButton-startIcon': {
            color: muiTheme.palette.text.secondary, // Icon color on hover
          },
        }}
      >
        Connexion
      </Button>
    </Box>
  )
}

export default Login
