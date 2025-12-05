dotev.config()
import express from 'express'
import products from './data/data.js'
import dotev from 'dotenv'
import cors from 'cors'
import conncectDB from './config/db.js'
import productRouter from './routes/productsRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

conncectDB()
const port = 5000
const app = express()
app.use(cors())

app.get('/', (req, res) => {
  return res.send('Hello World this is node mone')
})

app.use('/api/products', productRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`nodemon is watching  on port ${port}`)
})
