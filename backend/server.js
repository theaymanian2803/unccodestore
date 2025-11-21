dotev.config()
import express from 'express'
import products from './data/data.js'
import dotev from 'dotenv'
import cors from 'cors'
import conncectDB from './config/db.js'

conncectDB()
const port = 5000
const app = express()
app.use(cors())

app.get('/', (req, res) => {
  return res.send('Hello World this is node mone')
})
app.get('/api/products', (req, res) => {
  return res.json(products)
})
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  return res.json(product)
})

app.listen(port, () => {
  console.log(`nodemon is watching  on port ${port}`)
})
