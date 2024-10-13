import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import DataFormModal from '../../components/DataFormModal'
import { updateUserSettings, getUserSettings } from '../../services/apiService'

function Settings({ token, handleSessionExpiration }) {
  const [settings, setSettings] = useState(null)

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

  const handleSuccess = () => {
    alert('Paramètres mis à jour avec succès')
  }

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
        onClose={() => {}}
        handleSuccess={handleSuccess}
        handleSessionExpiration={handleSessionExpiration}
        dataType={'paramètres'}
        addMethod={updateUserSettings}
        updateMethod={updateUserSettings}
        getByIdMethod={() => Promise.resolve(settings)}
      />
    </Box>
  )
}

export default Settings
