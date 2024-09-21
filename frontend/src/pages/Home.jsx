import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { NewReleases, Star } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { getLatestProducts, getFeaturedProducts } from '../services/apiService'
import ProductList from '../components/ProductList'

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const muiTheme = useTheme()

  useEffect(() => {
    // Charger les 3 derniers produits ajoutés
    const fetchLatestProducts = async () => {
      try {
        const products = await getLatestProducts()
        setLatestProducts(products.slice(0, 3))
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des derniers produits :',
          error
        )
      }
    }

    // Charger les 3 produits à la une
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts()
        setFeaturedProducts(products.slice(0, 3))
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des produits à la une :',
          error
        )
      }
    }

    fetchLatestProducts()
    fetchFeaturedProducts()
  }, [])

  return (
    <div>
      {/* Section pour les derniers produits */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <NewReleases sx={{ mr: 1, pb: 0.2 }} /> {/* Icône avec style */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 'bold', color: muiTheme.palette.text.primary }}
        >
          Derniers produits
        </Typography>
      </Box>
      <ProductList products={latestProducts} />

      {/* Section pour les produits à la une */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Star sx={{ mr: 1, pb: 0.2 }} />
        {/* Icône avec style */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 'bold', color: muiTheme.palette.text.primary }}
        >
          Produits à la une
        </Typography>
      </Box>
      <ProductList products={featuredProducts} />
    </div>
  )
}

export default Home
