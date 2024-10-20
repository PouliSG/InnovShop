import React, { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import {
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Link,
  Snackbar,
  Alert,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'
import { login, forgotPassword, resetPassword } from '../services/authService'
import { getUserSettings } from '../services/apiService'
import {
  TOKEN_KEY,
  SETTINGS_KEY,
  USER_ROLE_KEY,
  EXPIRES_IN_KEY,
} from '../utils/constants'

function Login({
  handleClose,
  handleSuccess,
  handleForgotPassword,
  isResetPassword = false,
}) {
  const { resetToken } = useParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const muiTheme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (error !== '') {
      alert('Veuillez corriger les erreurs avant de soumettre le formulaire')
      return
    }
    if (!isForgotPassword && !isResetPassword) {
      if (!email || !password) {
        setError('Veuillez remplir tous les champs')
        return
      } else if (!email.includes('@')) {
        setError('Veuillez saisir une adresse email valide')
        return
      } else {
        setError('')
      }
      try {
        const response = await login(email, password)
        const token = response.token
        localStorage.setItem(TOKEN_KEY, token)
        const decodedToken = jwtDecode(token)
        localStorage.setItem(USER_ROLE_KEY, decodedToken.user.role)
        localStorage.setItem(EXPIRES_IN_KEY, decodedToken.exp)

        const settings = await getUserSettings(token)
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
        handleSuccess(token) // Send token up to parent
        if (location.pathname === '/login') {
          navigate('/')
        } else {
          handleClose() // Close the popup
        }
      } catch (err) {
        setError(err.msg)
      }
    } else if (isResetPassword) {
      // Handle forgot password
      if (!password) {
        setError('Veuillez saisir un mot de passe valide')
        return
      } else {
        setError('')
      }
      try {
        await resetPassword(resetToken, password)
        handleSuccess()
        navigate('/login')
      } catch (err) {
        setError(err.msg)
      }
    } else {
      // Handle forgot password
      if (!email) {
        setError('Veuillez saisir votre adresse email')
        return
      } else if (!email.includes('@')) {
        setError('Veuillez saisir une adresse email valide')
        return
      } else {
        setError('')
      }
      try {
        await forgotPassword(email)
        setIsForgotPassword(false)
        handleForgotPassword()
        handleClose() // Close the popup
      } catch (err) {
        setError(err.msg)
      }
    }
  }

  const handlepasswordMatch = (e) => {
    if (password !== e.target.value) {
      setError('Les mots de passe ne correspondent pas')
    } else {
      setError('')
    }
    setConfirmPassword(e.target.value)
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
        padding: 2,
        borderRadius: 2,
        width: 400, // Control the width of the popup
        margin: 'auto', // Center it horizontally
        position: 'relative', // Set relative position for the close button
      }}
    >
      <Typography variant="h6" component="h2" color="secondary">
        {isResetPassword
          ? `Réinitialiser le mot de passe`
          : isForgotPassword
            ? `Mot de passe oublié`
            : `Connexion`}
      </Typography>
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
      {!isResetPassword && (
        <TextField
          label="Adresse email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
      )}
      {!isForgotPassword && (
        <TextField
          label="Mot de passe"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
      )}
      {!isForgotPassword && !isResetPassword && (
        <Link
          onClick={() => setIsForgotPassword(true)}
          color="primary"
          sx={{ cursor: 'pointer' }}
        >
          Mot de passe oublié ?
        </Link>
      )}
      {isResetPassword && (
        <>
          <TextField
            label="Confirmer le mot de passe"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={handlepasswordMatch}
            fullWidth
            required
          />
        </>
      )}
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
        {isResetPassword
          ? `Réinitialiser le mot de passe`
          : isForgotPassword
            ? `Envoyer le lien`
            : `Connexion`}
      </Button>
    </Box>
  )
}

export default Login
