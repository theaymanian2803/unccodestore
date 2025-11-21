import React, { useEffect, useState } from 'react'
import ProductGrid from './ProductGrid'
import axios from 'axios'

function Grid() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:5000/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div className=" mt-8 p-7 grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductGrid key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Grid
