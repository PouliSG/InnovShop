export const API_URL = 'http://localhost:5000/api' // Base URL pour toutes les API
export const TOKEN_KEY = 'auth_token' // Nom de la clé utilisée pour stocker le token dans le localStorage
export const TIMEOUT = 5000 // Timeout par défaut pour les requêtes HTTP

export const DataStructure = {
  produit: [
    {
      name: 'name',
      label: 'Nom du produit',
      type: 'TextField',
      format: 'string',
      required: true,
    },
    {
      name: 'brand',
      label: 'Marque',
      type: 'TextField',
      format: 'string',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'TextField',
      format: 'string',
      required: true,
    },
    {
      name: 'price',
      label: 'Prix (€)',
      type: 'TextField',
      format: 'float',
      required: true,
    },
    {
      name: 'category',
      label: 'Catégorie',
      type: 'Select',
      required: true,
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'TextField',
      format: 'integer',
      required: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'TextField',
      format: 'string',
      required: true,
    },
    {
      name: 'featured',
      label: 'Marquer comme produit à la une ?',
      type: 'CheckBox',
      required: false,
    },
  ],
}

export const DefaultData = {
  produit: {
    name: '',
    brand: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    featured: false,
    image: '',
  },
}
