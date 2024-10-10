export const API_URL = 'http://localhost:5000/api' // Base URL pour toutes les API
export const TOKEN_KEY = 'auth_token' // Nom de la clé utilisée pour stocker le token dans le localStorage
export const TIMEOUT = 5000 // Timeout par défaut pour les requêtes HTTP

export const DataStructure = {
  produit: [
    {
      name: 'name',
      label: 'Nom du produit',
      type: 'TextField',
      format: (value) => value,
      required: true,
    },
    {
      name: 'brand',
      label: 'Marque',
      type: 'TextField',
      format: (value) => value,
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'TextField',
      format: (value) => value,
      required: true,
    },
    {
      name: 'price',
      label: 'Prix',
      type: 'TextField',
      format: (value) => value.toFloat(),
      required: true,
    },
    {
      name: 'category',
      label: 'Catégorie',
      type: 'Select',
      format: (value) => value.name,
      key: (value) => value._id,
      required: true,
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'TextField',
      format: (value) => value.toFloat(),
      required: true,
    },
    {
      name: 'featured',
      label: 'Featured',
      type: 'CheckBox',
      format: (value) => value.toBoolean(),
      required: false,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'TextField',
      format: (value) => value,
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
