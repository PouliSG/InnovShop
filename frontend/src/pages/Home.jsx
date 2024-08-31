import React, { useEffect, useState } from 'react'
import { getLatestProducts, getFeaturedProducts } from '../services/apiService'
import ProductList from '../components/ProductList'
import FeaturedProducts from '../components/FeaturedProducts'

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])

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
      <h1>Bienvenue sur InnovShop</h1>
      <p>Découvrez nos derniers produits innovants !</p>

      {/* Section pour les derniers produits */}
      <h2>Derniers produits</h2>
      <ProductList products={latestProducts} />

      {/* Section pour les produits à la une */}
      <h2>Produits à la une</h2>
      <FeaturedProducts products={featuredProducts} />
    </div>
  )
}

export default Home
