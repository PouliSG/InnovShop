import React, { createContext, useState, useContext } from 'react'

// Créer le contexte
const LoadingContext = createContext()

// Créer un hook personnalisé pour utiliser le contexte
export const useLoading = () => useContext(LoadingContext)

// Créer le fournisseur de contexte
export const LoadingProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0)

  // Fonction pour démarrer le chargement
  const startLoading = () => setLoadingCount((count) => count + 1)

  // Fonction pour arrêter le chargement
  const stopLoading = () => setLoadingCount((count) => Math.max(count - 1, 0))

  // Vérifier si le chargement est en cours
  const isLoading = loadingCount > 0

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}
