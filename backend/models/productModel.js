import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
})

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    artist_name: { type: String, required: true },
    brand: { type: String, required: true },

    price: { type: Number, required: true },
    instock: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },

    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },

    description: { type: String, required: true },
    images: [{ type: String }],
    whatsInside: [{ type: String }],
    perfectFor: { type: String, required: true },
    format: { type: String, required: true },
    license: { type: String, required: true },

    otherFeatures: [
      {
        title: { type: String, required: true },
        text: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],

    lifetimeAccess: {
      title: { type: String, required: true },
      text: { type: String, required: true },
    },

    programCompatibility: {
      title: { type: String, required: true },
      text: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', ProductSchema)

export default Product
