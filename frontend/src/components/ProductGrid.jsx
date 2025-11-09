import React from 'react'
import Rating from './Rating'
function ProductGrid(props) {
  const { name, price, image, rating, numReviews } = props.product

  return (
    <div className="flex flex-col justify-center items-center container mx-auto">
      <div className="mt-5 ">
        <img src={image} alt="img" className="w-full h-full object-cover -ml-6" />
      </div>
      <div className="mt-2">
        <h3 className="font-semibold mt-2 w-[220px]  ">{name}</h3>
        <div className="flex mt-2  items-center gap-2">
          <Rating value={rating} text={numReviews} />
          <h3 className="font-bold text-xs">({numReviews})</h3>
        </div>
        <h2 className="font-bold mb-2">{price} USD</h2>
      </div>
    </div>
  )
}

export default ProductGrid
