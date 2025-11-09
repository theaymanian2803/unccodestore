import React from 'react'
import ProductGrid from './ProductGrid'

function Grid({ products }) {
  return (
    <div className=" mt-8 p-7 grid grid-cols-4 gap-4 max-w-7xl mx-auto  ">
      {products.map((product) => (
        <ProductGrid key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Grid
