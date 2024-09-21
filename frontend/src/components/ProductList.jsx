import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import ProductItem from './ProductItem'

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
        <ProductItem key={product._id} product={product} />
      ))}
    </Box>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default ProductList
