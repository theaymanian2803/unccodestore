import asyncHandler from '../middleware/asyncHandler.js'
import Component from './../models/componentsModel.js'

// @desc Get all components
const getComponents = asyncHandler(async (req, res) => {
  try {
    const components = await Component.find().sort({ createdAt: -1 })
    res.status(200).json(components)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// @desc Create a component (Admin only)
const createComponent = asyncHandler(async (req, res) => {
  try {
    const newComponent = await Component.create(req.body)
    res.status(201).json(newComponent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

const deleteComponent = asyncHandler(async (req, res) => {
  const component = await Component.findById(req.params.id)

  if (component) {
    await Component.deleteOne({ _id: component._id })
    res.json({ message: 'Component removed' })
  } else {
    res.status(404)
    throw new Error('Component not found')
  }
})

export { getComponents, createComponent, deleteComponent }
