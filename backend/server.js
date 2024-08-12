const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Charger les variables d'environnement
dotenv.config()

// Se connecter à MongoDB
connectDB()

const app = express()

// Middleware
app.use(bodyParser.json())

// Définir les routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/product'))
app.use('/api/orders', require('./routes/order'))
app.use('/api/users', require('./routes/user'))
app.use('/api/addresses', require('./routes/address'))
app.use('/api/categories', require('./routes/category'))
app.use('/api/cart', require('./routes/cart'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`)
)
