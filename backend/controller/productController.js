import asyncHandler from '../middleware/asyncHandler.js'
import Product from './../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  return res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    return res.json(product)
  }
  return res.status(404).json({ message: 'Product not found' })
})

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    artist_name: 'Sample Artist', // NEW: Required by your model
    price: 10,
    user: req.user._id,
    images: ['/images/1.png'], // FIXED: Must be an array []
    brand: 'Sample brand test 2',
    category: 'Sample category',
    instock: 'In Stock', // NEW: Required by your model as a String
    countInStock: 0,
    numReviews: 0,
    rating: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, images, brand, category, countInStock, instock, artist_name } =
    req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.images = images
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.instock = instock
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, createProduct, updateProduct }
