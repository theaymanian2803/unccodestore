import express from 'express'
import dotev from 'dotenv'
import cors from 'cors'

import conncectDB from './config/db.js'
import cookieParser from 'cookie-parser'

import productRouter from './routes/productsRoutes.js'
import userRouter from './routes/userRoutes.js'
import ordersRouter from './routes/orderRoutes.js'

import { notFound, errorHandler } from './middleware/errorHandler.js'

dotev.config()

conncectDB()

const port = process.env.PORT || 5000

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
)
app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})

app.get('/', (req, res) => {
  return res.send('Hello World this is node mone')
})

// 7. Define API Routes
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', ordersRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`nodemon is watching on port ${port}`)
})
