import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useTheme } from '@mui/material/styles'

const ProductItem = ({ product }) => {
  const muiTheme = useTheme()
  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      {product.featured && (
        <StarIcon
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: muiTheme.palette.secondary.main,
          }}
        />
      )}
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
