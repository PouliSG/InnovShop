import React, { useState } from 'react'
import {
  Button,
  TextField,
  Box,
  IconButton,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useTheme } from '@mui/material/styles'
import { register } from '../services/authService'
import { DataStructure } from '../utils/constants'
import ValidatedTextField from './ValidatedTextField'

function Register({ handleClose }) {
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [birthdate, setBirthdate] = useState(null) // Initially null for DatePicker
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newsletterOptin, setNewsletterOptin] = useState(false)
  const [error, setError] = useState('')
  const muiTheme = useTheme()

  // États pour les erreurs
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Vérifier s'il y a des erreurs de validation
    if (emailError || passwordError || confirmPasswordError) {
      setError(
        'Veuillez corriger les erreurs avant de soumettre le formulaire.'
      )
      return
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    } else {
      setError('')
    }
    try {
      await register({
        email,
        password,
        firstname,
        lastname,
        gender,
        birthdate,
        newsletterOptin,
      })
      handleClose()
    } catch (err) {
      setError(err.message)
    }
  }

  const emailField = DataStructure.utilisateur.find(
    (field) => field.name === 'email'
  )

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

      {/* Firstname */}
      <ValidatedTextField
        label="Prénom"
        name="firstname"
        variant="outlined"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        fullWidth
        required
      />

      {/* Lastname */}
      <ValidatedTextField
        label="Nom"
        name="lastname"
        variant="outlined"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        fullWidth
        required
      />

      {/* Gender */}
      <ValidatedTextField
        select
        label="Sexe"
        name="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        fullWidth
      >
        <MenuItem value="male">Homme</MenuItem>
        <MenuItem value="female">Femme</MenuItem>
        <MenuItem value="other">Autre</MenuItem>
      </ValidatedTextField>

      {/* Birthdate */}
      <DatePicker
        label="Date de naissance"
        value={birthdate}
        onChange={(newValue) => setBirthdate(newValue)}
        inputFormat="dd/MM/yyyy" // Format the date as dd/MM/yyyy
        renderInput={(params) => <TextField {...params} fullWidth />}
        views={['year', 'month', 'day']} // Allows selection by year first
      />

      {/* Email */}
      <ValidatedTextField
        label="Email"
        name="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        validation={emailField.validation}
        errorMessage={emailField.errorMessage}
      />

      {/* Password */}
      <ValidatedTextField
        label="Mot de passe"
        name="password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />

      {/* Confirm Password */}
      <ValidatedTextField
        label="Confirmer le mot de passe"
        name="confirmPassword"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() => {
          if (password !== confirmPassword) {
            setConfirmPasswordError('Les mots de passe ne correspondent pas.')
          } else {
            setConfirmPasswordError('')
          }
        }}
        fullWidth
        required
        errorMessage={confirmPasswordError}
      />

      {/* Newsletter Opt-in */}
      <FormControlLabel
        control={
          <Checkbox
            checked={newsletterOptin}
            onChange={(e) => setNewsletterOptin(e.target.checked)}
            color="primary"
          />
        }
        label="Je souhaite recevoir la newsletter"
      />

      {error && <Box sx={{ color: 'red' }}>{error}</Box>}

      <Button
        type="submit"
        startIcon={<PersonAddIcon />}
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
        S'enregistrer
      </Button>

      {/* Légende pour les champs obligatoires */}
      <Typography variant="caption" sx={{ color: 'gray', mt: 2 }}>
        * Champs obligatoires
      </Typography>
    </Box>
  )
}

export default Register
