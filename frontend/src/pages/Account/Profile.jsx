import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { getUserProfile, updateUserProfile } from '../../services/apiService'
import { useLoading } from '../../utils/context/loadingContext'

function Profile({ token, handleSessionExpiration }) {
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    birthdate: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  const { startLoading, stopLoading } = useLoading()

  useEffect(() => {
    const fetchProfile = async () => {
      startLoading()
      try {
        const data = await getUserProfile(token)
        setProfile(data)
        setIsLoading(false)
      } catch (error) {
        if (error.sessionExpired) {
          handleSessionExpiration()
        } else {
          console.error('Erreur lors de la récupération du profil :', error)
        }
      } finally {
        stopLoading()
      }
    }
    fetchProfile()
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    startLoading()
    try {
      await updateUserProfile(token, profile)
      alert('Profil mis à jour avec succès')
    } catch (error) {
      if (error.sessionExpired) {
        handleSessionExpiration()
      } else {
        console.error('Erreur lors de la mise à jour du profil :', error)
      }
    } finally {
      stopLoading()
    }
  }

  if (isLoading) {
    return <Typography>Chargement...</Typography>
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mes informations
      </Typography>
      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          label="Email"
          name="email"
          value={profile.email}
          disabled
          fullWidth
          margin="normal"
        />
        <TextField
          label="Prénom"
          name="firstname"
          value={profile.firstname}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nom"
          name="lastname"
          value={profile.lastname}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <RadioGroup
          name="gender"
          value={profile.gender}
          onChange={handleChange}
          row
          sx={{ mt: 2 }}
        />
        <TextField
          label="Date de naissance"
          name="birthdate"
          value={profile.birthdate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          key="newsletter_optin"
          control={
            <Checkbox
              checked={false}
              onChange={handleChange}
              name="newsletter_optin"
              color="primary"
            />
          }
          label="Opt-in newsletter"
        />
      </Box>
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Enregistrer
      </Button>
    </Box>
  )
}

export default Profile
