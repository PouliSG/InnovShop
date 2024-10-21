// export const API_URL = 'http://localhost:5000/api' // Base URL pour toutes les API
export const API_URL = 'https://innovshop.onrender.com/api' // Base URL pour toutes les API
export const TOKEN_KEY = 'auth_token' // Nom de la clé utilisée pour stocker le token dans le localStorage
export const SETTINGS_KEY = 'settings' // Nom de la clé utilisée pour stocker les paramètres dans le localStorage
export const TIMEOUT = 5000 // Timeout par défaut pour les requêtes HTTP
export const USER_ROLE_KEY = 'user_role' // Nom de la clé utilisée pour stocker le rôle de l'utilisateur dans le localStorage
export const EXPIRES_IN_KEY = 'expires_in' // Nom de la clé utilisée pour stocker la date d'expiration de la session dans le localStorage

export const DataStructure = {
  produit: [
    {
      name: 'name',
      label: 'Nom du produit',
      type: 'TextField',
      format: 'string',
      required: true,
      validation: /^.{2,}$/, // Au moins 2 caractères
      errorMessage: 'Veuillez saisir un nom de produit valide.',
    },
    {
      name: 'brand',
      label: 'Marque',
      type: 'TextField',
      format: 'string',
      required: true,
      validation: /^.{2,}$/, // Au moins 2 caractères
      errorMessage: 'Veuillez saisir une marque valide.',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'TextField',
      format: 'string',
      required: true,
      validation: /^.{2,}$/, // Au moins 2 caractères
      errorMessage: 'Veuillez saisir une description valide.',
    },
    {
      name: 'price',
      label: 'Prix (€)',
      type: 'TextField',
      format: 'float',
      required: true,
      validation: /^\d+(\.\d{1,2})?$/, // Regex pour un nombre avec deux décimales maximum
      errorMessage: 'Veuillez saisir un prix valide (ex : 19.99).',
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
      validation: /^\d+$/, // Regex pour un nombre entier positif
      errorMessage: 'Veuillez saisir une quantité valide.',
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
      validation: /^.{2,}$/, // Au moins 2 caractères
      errorMessage: 'Veuillez saisir un nom de catégorie valide.',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'TextField',
      format: 'string',
      required: true,
      validation: /^.{2,}$/, // Au moins 2 caractères
      errorMessage: 'Veuillez saisir une description valide.',
    },
  ],
  utilisateur: [
    {
      name: 'firstname',
      label: 'Prénom',
      type: 'TextField',
      format: 'string',
      required: true,
      validation: /^.{2,}$/, // Au moins 2 caractères
      errorMessage: 'Veuillez saisir un prénom valide.',
    },
    {
      name: 'lastname',
      label: 'Nom',
      type: 'TextField',
      format: 'string',
      required: true,
      validation: /^.{2,}$/, // Au moins 2 caractères
      errorMessage: 'Veuillez saisir un nom valide.',
    },
    {
      name: 'email',
      label: 'Adresse e-mail',
      type: 'TextField',
      format: 'email',
      required: true,
      validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex pour l'email
      errorMessage: 'Veuillez saisir une adresse email valide.',
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
      values: [
        { value: 'pending', label: 'En attente' },
        { value: 'shipped', label: 'Expediée' },
        { value: 'delivered', label: 'Reçue' },
        { value: 'cancelled', label: 'Annulée' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'paymentStatus',
      label: 'Statut du paiement',
      type: 'Select',
      values: [
        { value: 'pending', label: 'En attente' },
        { value: 'paid', label: 'Payée' },
        { value: 'failed', label: 'Echec' },
      ],
      defaultValue: 'pending',
      required: true,
    },
  ],
  adresse: [
    {
      name: 'number',
      label: 'Numéro',
      type: 'TextField',
      format: 'string',
      required: true,
      validation: /^\d+[a-zA-Z]?$/, // Numéro avec optionnellement une lettre (ex : 12B)
      errorMessage: 'Veuillez saisir un numéro de voie valide.',
    },
    {
      name: 'street',
      label: 'Rue',
      type: 'TextField',
      format: 'string',
      required: true,
      validation: /^.{2,}$/, // Au moins 2 caractères
      errorMessage: 'Veuillez saisir un nom de rue valide.',
    },
    {
      name: 'additional',
      label: "Complément d'adresse",
      type: 'TextField',
      format: 'string',
      required: false,
    },
    {
      name: 'city',
      label: 'Ville',
      type: 'TextField',
      format: 'string',
      required: true,
      validation: /^.{2,}$/, // Au moins 2 caractères
      errorMessage: 'Veuillez saisir un nom de ville valide.',
    },
    {
      name: 'zip',
      label: 'Code postal',
      type: 'TextField',
      format: 'string',
      required: true,
      validation: /^\d{5}$/, // 5 chiffres
      errorMessage: 'Le code postal doit être composé de 5 chiffres.',
    },
    {
      name: 'country',
      label: 'Pays',
      type: 'TextField',
      format: 'string',
      required: true,
      defaultValue: 'France',
      validation: /^.{2,}$/, // Au moins 2 caractères
      errorMessage: 'Veuillez saisir un nom de pays valide.',
    },
    {
      name: 'label',
      label: 'Libellé',
      type: 'TextField',
      format: 'string',
      required: false,
      defaultValue: 'Domicile',
      validation: /^.{2,}$/, // Au moins 2 caractères
      errorMessage: 'Veuillez saisir un libellé valide.',
    },
    {
      name: 'isDefault',
      label: 'Adresse par défaut',
      type: 'CheckBox',
      required: false,
    },
  ],
  paramètres: [
    {
      name: 'theme',
      label: 'Thème',
      type: 'Select',
      values: [
        {
          value: 'light',
          label: 'Clair',
        },
        {
          value: 'dark',
          label: 'Sombre',
        },
      ],
      required: true,
    },
    {
      name: 'language',
      label: 'Langue',
      type: 'Select',
      values: ['fr', 'en'],
      required: true,
    },
    {
      name: 'notifications',
      label: 'Activer les notifications',
      type: 'Switch',
      required: false,
    },
    {
      name: 'dense',
      label: 'Mode condensé pour les tableaux',
      type: 'Switch',
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
  adresse: {
    number: '',
    street: '',
    additional: '',
    city: '',
    zip: '',
    country: 'France',
    label: 'Domicile',
    isDefault: false,
  },
  paramètres: {
    notifications: true,
    theme: 'dark',
    language: 'fr',
    dense: true,
  },
}
