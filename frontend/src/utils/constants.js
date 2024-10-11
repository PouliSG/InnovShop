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
      values: 'categories',
      key: '_id',
      value: 'name',
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
  catégorie: [
    {
      name: 'name',
      label: 'Nom de la catégorie',
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
  ],
  utilisateur: [
    {
      name: 'firstname',
      label: 'Prénom',
      type: 'TextField',
      format: 'string',
      required: true,
    },
    {
      name: 'lastname',
      label: 'Nom',
      type: 'TextField',
      format: 'string',
      required: true,
    },
    {
      name: 'email',
      label: 'Adresse e-mail',
      type: 'TextField',
      format: 'email',
      required: true,
    },
    {
      name: 'gender',
      label: 'Sexe',
      type: 'TextField',
      format: 'string',
      required: false,
    },
    {
      name: 'birthdate',
      label: 'Date de naissance',
      type: 'TextField',
      format: 'date',
      required: false,
    },
    {
      name: 'verified',
      label: 'Compte vérifié ?',
      type: 'CheckBox',
      required: false,
    },
    {
      name: 'active',
      label: 'Compte actif ?',
      type: 'CheckBox',
      required: false,
    },
    {
      name: 'role',
      label: 'Rôle',
      type: 'Select',
      values: ['admin', 'employee', 'user'],
      required: true,
    },
    // {
    //   name: 'password',
    //   label: 'Mot de passe',
    //   type: 'TextField',
    //   format: 'password',
    //   required: true,
    // },
    // {
    //   name: 'signup_date',
    //   label: "Date d'inscription",
    //   type: 'TextField',
    //   format: 'date',
    //   required: false,
    // },
    // {
    //   name: 'last_login_date',
    //   label: 'Dernière connexion',
    //   type: 'TextField',
    //   format: 'date',
    //   required: false,
    // },
    // {
    //   name: 'resetPasswordToken',
    //   label: 'Token de réinitialisation du mot de passe',
    //   type: 'TextField',
    //   format: 'string',
    //   required: false,
    // },
    // {
    //   name: 'resetPasswordExpires',
    //   label: 'Expiration du token de réinitialisation du mot de passe',
    //   type: 'TextField',
    //   format: 'date',
    //   required: false,
    // },
    // {
    //   name: 'settings',
    //   label: 'Paramètres',
    //   type: 'TextField',
    //   format: 'object',
    //   required: false,
    // },
    {
      name: 'newsletter_optin',
      label: 'Opt-in newsletter',
      type: 'CheckBox',
      required: false,
    },
  ],
  commande: [
    {
      name: 'user',
      label: 'Utilisateur',
      type: 'AutocComplete',
      values: 'users', // Indique que nous devons charger la liste des utilisateurs
      key: '_id',
      value: (option) =>
        `${option.firstname} ${option.lastname} (${option.email})`,
      required: true,
    },
    {
      name: 'shippingAddress',
      label: 'Adresse de livraison',
      type: 'Select',
      values: 'shippingAddresses', // Sera chargé en fonction de l'utilisateur sélectionné
      key: '_id',
      value: 'fullAddress', // Assurez-vous que l'adresse a un champ 'fullAddress'
      required: true,
    },
    {
      name: 'products',
      label: 'Produits',
      type: 'ProductList', // Type de champ personnalisé pour gérer les produits multiples
      required: true,
    },
    {
      name: 'totalPrice',
      label: 'Prix total',
      type: 'TextField',
      format: 'float',
      value: (products) =>
        products.reduce((acc, product) => acc + product.price, 0),
      required: true,
      readOnly: true, // Champ en lecture seule
    },
    {
      name: 'status',
      label: 'Statut de la commande',
      type: 'Select',
      values: ['pending', 'shipped', 'delivered', 'cancelled'],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'paymentStatus',
      label: 'Statut du paiement',
      type: 'Select',
      values: ['pending', 'paid', 'failed'],
      defaultValue: 'pending',
      required: true,
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
  catégorie: {
    name: '',
    description: '',
  },
  utilisateur: {
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    birthdate: '',
    role: '',
    verified: false,
    active: true,
  },
  commande: {
    user: '',
    shippingAddress: '',
    products: [], // Tableau des produits avec quantité
    totalPrice: 0,
    status: 'pending',
    paymentStatus: 'pending',
  },
}
