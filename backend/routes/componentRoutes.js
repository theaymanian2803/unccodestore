import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getComponents,
  createComponent,
  deleteComponent,
} from '../controller/componentController.js'

router.get('/', getComponents)
router.route('/').post(protect, admin, createComponent)

router.route('/:id').delete(protect, admin, deleteComponent)

// Add your admin middleware here

export default router
