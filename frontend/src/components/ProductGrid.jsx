import { Grid2 as Grid, Box, Pagination } from '@mui/material'
import ProductItem from './ProductItem' // Un composant pour afficher un produit

const ProductGrid = ({ products, page, setPage, category, filter, sort }) => {
  const itemsPerPage = 10

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(products.length / itemsPerPage)

  // Calculer les produits à afficher pour la page actuelle
  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  // Gérer le changement de page
  const handlePageChange = (event, value) => {
    setPage(value)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        pt: 2,
      }}
    >
      {/* Grille des produits */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{
          maxWidth: '1200px', // Limite la largeur maximale de la grille
          margin: '0 auto',
        }}
      >
        {paginatedProducts.map((product) => (
          <Grid
            item="true"
            xs={12} // 1 produit par ligne sur mobile
            sm={6} // 2 produits par ligne sur les écrans petits
            md={4} // 3 produits par ligne sur les écrans moyens
            lg={3} // 4 produits par ligne sur les grands écrans
            key={product._id}
          >
            <ProductItem
              product={product}
              category={category}
              page={page}
              filter={filter}
              sort={sort}
            />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{ mt: 4 }} // Marge au-dessus de la pagination
        color="primary"
      />
    </Box>
  )
}

export default ProductGrid
