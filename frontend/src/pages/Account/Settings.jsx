import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import DataFormModal from '../../components/DataFormModal'
import { updateUserSettings, getUserSettings } from '../../services/apiService'

function Settings({ token, handleSessionExpiration, handleSuccess }) {
  const [settings, setSettings] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getUserSettings(token)
        setSettings(data)
      } catch (error) {
        if (error.sessionExpired) {
          handleSessionExpiration()
        } else {
          console.error(
            'Erreur lors de la récupération des paramètres :',
            error
          )
        }
      }
    }
    fetchSettings()
  }, [token])

  if (!settings) {
    return <Typography>Chargement...</Typography>
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mes paramètres
      </Typography>
      <DataFormModal
        token={token}
        onClose={() => navigate(-1)}
        handleSuccess={handleSuccess}
        handleSessionExpiration={handleSessionExpiration}
        dataType={'paramètres'}
        addMethod={updateUserSettings}
        updateMethod={updateUserSettings}
        getByIdMethod={() => Promise.resolve(settings)}
        modal={false}
      />
    </Box>
  )
}

export default Settings
