import React from 'react'
import {
  Box,
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'

const DashboardAdmin = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Commandes en attente</Typography>
              <Typography variant="body2">
                Voir les commandes non traitées
              </Typography>
              <Button
                component={Link}
                to="/admin/orders"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Gérer les commandes
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ajouter un produit</Typography>
              <Typography variant="body2">
                Ajouter un nouveau produit à la boutique
              </Typography>
              <Button
                component={Link}
                to="/admin/products/add"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Ajouter un produit
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ajouter une catégorie</Typography>
              <Typography variant="body2">
                Créer une nouvelle catégorie
              </Typography>
              <Button
                component={Link}
                to="/admin/categories/add"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Ajouter une catégorie
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Gérer les utilisateurs</Typography>
              <Typography variant="body2">
                Voir et gérer les comptes utilisateurs
              </Typography>
              <Button
                component={Link}
                to="/admin/users"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Gérer les utilisateurs
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardAdmin
