import React, { useState } from 'react'
import {
  Button,
  TextField,
  Box,
  IconButton,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useTheme } from '@mui/material/styles'
import { register } from '../services/authService'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
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
      <TextField
        label="Prénom"
        variant="outlined"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        fullWidth
      />

      {/* Lastname */}
      <TextField
        label="Nom"
        variant="outlined"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        fullWidth
      />

      {/* Gender */}
      <TextField
        select
        label="Sexe"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        fullWidth
      >
        <MenuItem value="male">Homme</MenuItem>
        <MenuItem value="female">Femme</MenuItem>
        <MenuItem value="other">Autre</MenuItem>
      </TextField>

      {/* Birthdate */}
      <DatePicker
        label="Date de naissance"
        value={birthdate}
        onChange={(newValue) => setBirthdate(newValue)}
        inputFormat="dd/MM/yyyy" // Format the date as dd/MM/yyyy
        renderInput={(params) => <TextField {...params} fullWidth />} // This renders the input field
        views={['year', 'month', 'day']} // Allows selection by year first
      />

      {/* Email */}
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      {/* Password */}
      <TextField
        label="Mot de passe"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      {/* Confirm Password */}
      <TextField
        label="Confirmer le mot de passe"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
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
    </Box>
  )
}

export default Register
