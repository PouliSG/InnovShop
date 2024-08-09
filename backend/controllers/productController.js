const Product = require('../models/Product')

// Add a product
const addProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
    })
    const product = await newProduct.save()
    res.status(201).json(product)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Update Product
const updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, price, category, stock, featured } = req.body

  try {
    let product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    product.name = name || product.name
    product.description = description || product.description
    product.price = price || product.price
    product.category = category || product.category
    product.stock = stock || product.stock
    product.featured = featured !== undefined ? featured : product.featured

    await product.save()
    res.json(product)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' })
    }
    await product.remove()
    res.status(200).json({ msg: 'Product removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
}
