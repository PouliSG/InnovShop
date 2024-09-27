import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Votre commande a été passée avec succès !
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Nous vous remercions pour votre achat. Vous recevrez bientôt un email de confirmation avec les détails de votre commande.
      </Typography>
      <Button component={Link} to="/products" variant="contained" color="primary">
        Continuer vos achats
      </Button>
    </Box>
  );
};

export default OrderConfirmation;
