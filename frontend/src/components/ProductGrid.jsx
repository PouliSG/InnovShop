import { Grid2 as Grid, Box } from '@mui/material'
import ProductItem from './ProductItem' // Un composant pour afficher un produit
import InfiniteScroll from 'react-infinite-scroll-component'

const ProductGrid = ({ products, loadProducts, page, setPage }) => {
  const handleScroll = () => {
    setPage(page + 1)
    loadProducts()
  }

  return (
    <Box>
      {/* Grille des produits */}
      <InfiniteScroll
        dataLength={products.length}
        next={handleScroll}
        hasMore={false} // TODO: Définir une condition pour charger plus de produits
        loader={<h4>Chargement...</h4>} // TODO: Intégrer Facebook loader
      >
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  )
}

export default ProductGrid
