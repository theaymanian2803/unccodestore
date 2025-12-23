import React from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom'
function ProductGrid(props) {
  const { _id, name, price, images, rating, numReviews } = props.product

  return (
    <Link
      to={`/product/${_id}`}
      className="flex flex-col cursor-pointer justify-center items-center container mx-auto">
      <div className="mt-5 ">
        {images && images.length > 0 && (
          <img src={images[0]} alt="img" className="w-full h-full object-cover md:-ml-6" />
        )}
      </div>
      <div className="mt-2">
        <h3 className="font-semibold mt-2 w-[220px]  ">{name}</h3>
        <div className="flex mt-2  items-center gap-2">
          <Rating value={rating} text={numReviews} />
          <h3 className="font-bold text-xs">({numReviews})</h3>
        </div>
        <h2 className="font-bold mb-2">{price} USD</h2>
      </div>
    </Link>
  )
}

export default ProductGrid
