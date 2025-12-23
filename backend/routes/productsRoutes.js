import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from '../controller/productController.js'
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).put(protect, admin, updateProduct)

export default router
