import React, { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import {
  getProducts,
  getProductsByCategory,
  getCategories,
} from '../services/apiService'
import ProductFilters from '../components/ProductFilters'
import ProductGrid from '../components/ProductGrid'
import { useLoading } from '../utils/context/loadingContext'

const Products = () => {
  const location = useLocation()

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [categories, setCategories] = useState([])
  // State pour gérer l'affichage des filtres
  const [showFilters, setShowFilters] = useState(false)
  const [category, setCategory] = useState(location.state?.category || 'all')
  const [sort, setSort] = useState(location.state?.sort || '')
  const [filter, setFilter] = useState(
    location.state?.filter || { priceRange: [0, 100000] }
  )
  const { startLoading, stopLoading } = useLoading()

  const loadProducts = useCallback(async () => {
    let result
    startLoading()
    if (category && category !== 'all') {
      result = await getProductsByCategory(category, page)
    } else {
      result = await getProducts(page, sort, filter)
    }
    setProducts(result)
    stopLoading()
    // setProducts((prevProducts) => [...prevProducts, ...result])
  }, [category, page, sort, filter])

  // Fonction pour afficher ou cacher le composant ProductFilters
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  useEffect(() => {
    loadProducts()
    // Charger les produits à chaque modification des filtres ou tri
    // }, [category, page, sort, filter, loadProducts])
  }, [category, loadProducts])

  useEffect(() => {
    const fetchCategories = async () => {
      startLoading()
      try {
        const categories = await getCategories()
        setCategories(categories)
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error)
      } finally {
        stopLoading()
      }
    }

    fetchCategories()
  }, [])
  return (
    <Box sx={{ position: 'relative' }}>
      {/* Bouton de filtre */}
      <Button
        variant="contained"
        startIcon={<FilterListIcon />}
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
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
        category={category}
        filter={filter}
        sort={sort}
      />
    </Box>
  )
}

export default Products
