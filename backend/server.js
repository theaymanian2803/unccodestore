import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'

// Route Imports
import productRouter from './routes/productsRoutes.js'
import userRouter from './routes/userRoutes.js'
import ordersRouter from './routes/orderRoutes.js'
import uploadRouter from './routes/uploadRoute.js'
import contactAdmin from './routes/contactRoutes.js'
import componentRouter from './routes/componentRoutes.js'

// Middleware Imports
import { notFound, errorHandler } from './middleware/errorHandler.js'

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 5000

// 1. Essential Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// 2. CORS Configuration
// In production, we restrict origins for better security
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173',
  credentials: true,
}
app.use(cors(corsOptions))

// 3. API Routes
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/uploads', uploadRouter)
app.use('/api/contact', contactAdmin)
app.use('/api/components', componentRouter)

app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})

// 4. Static and Production Handling
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '/frontend/dist')

  app.use(express.static(distPath))

  // In Express 5, you must name the wildcard parameter.
  // We use ':index*' to capture everything and serve index.html.
  app.get('/:index*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'))
  })
}

// 5. Error Handling (Must be last)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
)
