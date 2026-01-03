import mongoose from 'mongoose'

const ComponentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    filename: { type: String, required: true },
    code: { type: String, required: true }, // The actual JS/HTML string
    category: { type: String, default: 'JS' },
  },
  { timestamps: true }
)

const Component = mongoose.model('Component', ComponentSchema)

export default Component
