import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useTheme } from '@mui/material/styles'

const ProductItem = ({ product }) => {
  const muiTheme = useTheme()
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    navigate(`/products/${product._id}`)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Card
      sx={{
        position: 'relative',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box sx={{ position: 'relative' }}>
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
        {/* Description affichée par-dessus l'image */}
        {isHovered && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)', // 30% transparent background
              color: muiTheme.palette.common.white,
              padding: '8px',
              textAlign: 'justify',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: muiTheme.palette.common.white }}
            >
              {product.description}
            </Typography>
          </Box>
        )}
      </Box>
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
  )
}

export default ProductItem
