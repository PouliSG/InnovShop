import { useState, useCallback } from 'react'
import { TOKEN_KEY } from '../constants'

export const useSessionManager = (onSessionExpired) => {
  const [sessionExpired, setSessionExpired] = useState(false)

  const handleSessionExpired = useCallback(() => {
    // Supprimer le token
    localStorage.removeItem(TOKEN_KEY)
    setSessionExpired(true)

    // Appeler la fonction de gestion de la popup pour l'ouvrir
    if (onSessionExpired) {
      onSessionExpired()
    }
  }, [onSessionExpired])

  return { sessionExpired, handleSessionExpired }
}
