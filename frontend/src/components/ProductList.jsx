import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material'

const ProductList = ({ products }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      gap={4}
      pb={2}
    >
      {products.map((product) => (
        <Card key={product._id}>
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2">{product.brand}</Typography>
            <Typography variant="body2" color="text.secondary">
              {product.price} €
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default ProductList
