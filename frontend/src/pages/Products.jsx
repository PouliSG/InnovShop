import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import {
  getProducts,
  getProductsByCategory,
  getCategories,
} from '../services/apiService'
import ProductFilters from '../components/ProductFilters'
import ProductGrid from '../components/ProductGrid'

const Products = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [categories, setCategories] = useState([])
  // State pour gérer l'affichage des filtres
  const [showFilters, setShowFilters] = useState(false)
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('')
  const [filter, setFilter] = useState({ priceRange: [0, 1000] })

  const loadProducts = useCallback(async () => {
    let result
    if (category && category !== 'all') {
      result = await getProductsByCategory(category, page)
    } else {
      result = await getProducts(page, sort, filter)
    }
    setProducts(result)
    // setProducts((prevProducts) => [...prevProducts, ...result])
  }, [category, page, sort, filter])

  // Fonction pour afficher ou cacher le composant ProductFilters
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  useEffect(() => {
    // Charger les produits à chaque modification des filtres ou tri
    loadProducts()
  }, [category, sort, filter, loadProducts])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories()
        setCategories(categories)
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error)
      }
    }

    fetchCategories()
  }, [])
  return (
    <div>
      <h1>Nos Produits</h1>

      {/* Bouton de filtre */}
      <Button
        variant="contained"
        startIcon={<FilterListIcon />}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={toggleFilters}
      >
        Filtrer/Trier
      </Button>
      {/* Section des filtres */}
      {showFilters && (
        <ProductFilters
          categories={categories}
          category={category}
          setCategory={setCategory}
          setSort={setSort}
          setFilter={setFilter}
        />
      )}
      <ProductGrid
        products={products}
        loadProducts={loadProducts}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default Products
