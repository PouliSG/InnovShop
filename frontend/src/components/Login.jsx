import React, { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { useTheme } from '@mui/material/styles'
import { login } from '../services/authService'
import { TOKEN_KEY } from '../constants'

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
      onLoginSuccess(token) // Send token up to parent
      handleClose() // Close the popup
    } catch (err) {
      setError(err.message)
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
      }}
    >
      <TextField
        label="Adresse email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Mot de passe"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      {error && <Box sx={{ color: 'red' }}>{error}</Box>}
      <Button
        type="submit"
        startIcon={<LoginIcon />}
        variant="contained"
        color="primary"
        sx={{
          color: muiTheme.palette.text.third,
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
