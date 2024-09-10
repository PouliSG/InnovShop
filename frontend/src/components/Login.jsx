import React, { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { useTheme } from '@mui/material/styles'
import { login } from '../services/authService'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const muiTheme = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
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
