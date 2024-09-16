import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const ProductItem = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.price} €
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductItem
