import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import productRouter from './routes/productsRoutes.js'
import userRouter from './routes/userRoutes.js'
import ordersRouter from './routes/orderRoutes.js'
import uploadRouter from './routes/uploadRoute.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

dotenv.config()
connectDB()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// Routes
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/uploads', uploadRouter)

app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})

app.get('/', (req, res) => res.send('API is running...'))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))
