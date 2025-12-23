import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import productsFace from './../data'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Rating from './../components/Rating'
import { addToCart } from './../slices/cartSlice'
import { useDispatch } from 'react-redux'
import { useGetProductDetailsQuery } from './../slices/productSlice'

function Product() {
  const { id } = useParams()
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currentImage, setCurrentImage] = useState(null)
  const [isLightboxOpen, setIsLightBoxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const addToCartHandler = () => {
    // The 'qty' state here is already a Number due to the onChange handler
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setCurrentImage(product.images[0])
    }
  }, [product])

  // FIX 3: Reset quantity state when the product page changes
  useEffect(() => {
    setQty(1)
  }, [id])

  const handleThumbnailClick = (imageSrc) => {
    setCurrentImage(imageSrc)
  }
  const closeLightbox = () => {
    setIsLightBoxOpen(false)
  }
  const openLightBox = (imgSrc) => {
    const index = product.images.indexOf(imgSrc)
    setLightboxImageIndex(index !== -1 ? index : 0)
    console.log(index)
    setIsLightBoxOpen(true)
  }

  const showNextImage = () => {
    setLightboxImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    )
  }
  const showPrevImage = () => {
    setLightboxImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    )
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">Loading...</div>
    )
  }
  if (error) {
    return <div>error</div>
  }

  // Check if product data failed to load or is empty
  if (!product || !product.name) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Product Not Found.
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white p-4 sm:p-8 font-medium">
      {/* breadcrumb header */}
      <div className=" text-sm text-gray-400 mb-7">
        <Link to="/"> Home</Link>
        <span className="mx-2 text-gray-600"></span>
        <span className=" text-gray-400 font-semibold">
          EXCLUSIVE DESIGN FAST LANE Collection – Built for Speed, Not Excuses
        </span>
      </div>
      {/* breadcrumb header end here */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* left column / images */}
        <div className="lg:sticky lg:top-4">
          <div className="mb-8 cursor-pointer" onClick={() => openLightBox(currentImage)}>
            <img src={currentImage} alt="product image" className="w-full h-auto" />
          </div>
          {/* thumbnails images / images */}
          <div className="flex justify-start space-x-4 mb-10 overflow-x-auto pb-2">
            {product.images?.map((imageSrc, index) => (
              <img
                src={imageSrc}
                key={index}
                alt="product image"
                className="w-24 h-24 object-contain transition-all duration-200"
                onClick={() => handleThumbnailClick(imageSrc)}
              />
            ))}
            {/* thumbnails images / images  end here*/}
          </div>
          {/* otherFeatures starts here*/}

          <div className="space-y-8 mt-10">
            <div className=" grid grid-cols-2 gap-7 text-sm">
              {product.otherFeatures?.map((feature, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold mb-2 flex  items-center">
                    <span className="mr-2 text-yellow-500"> {feature?.icon}</span>
                    {feature?.title}
                  </h3>
                  <p className="text-gray-300">{feature?.text}</p>
                </div>
              ))}
            </div>
            {/* otherFeatures starts ends here*/}

            {/* program compatibilities */}
            <hr className="border-amber-100/30" />
            {/* program compatibilities */}
            <div className="grid grid-cols-2 gap-7 text-sm">
              <div>
                <h3 className="text-lg font-bold mb-1">{product?.lifetimeAccess?.title}</h3>
                <p>{product?.lifetimeAccess?.text}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">{product?.programCompatibility?.title}</h3>
                <p
                  className="text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: product?.programCompatibility?.text.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong>$1</strong>'
                    ),
                  }}></p>
              </div>
            </div>
            {/* program compatibilities end here */}
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">{product.name}</h1>

          {/* Rating and Price */}
          <div className="flex items-center space-x-6 mb-6">
            <Rating value={product.rating} text={product.reviewCount} />
            <span className="text-3xl font-extrabold text-yellow-500">{product.price}</span>
          </div>
          <div>
            {product.countInStock > 0 && (
              <div className="flex gap-7  items-center">
                <span className="text-orange-400 text-xl font-bold">In Stock</span>
                <span className="text-orange-400 text-2xl">
                  <select
                    className="p-2 border-orange-500 rounded-2xl"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option className="text-black bg-amber-100" key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
            )}
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={addToCartHandler}
            className="w-full py-4 mt-3 bg-yellow-500 text-black font-extrabold uppercase text-lg hover:bg-yellow-400 transition duration-300 rounded-lg mb-10 cursor-pointer">
            Add to Bag
          </button>

          {/* Product Sections */}
          <div className="space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-extrabold border-b border-gray-800 pb-2 mb-4">
                Description
              </h2>
              <p className="text-gray-400 leading-relaxed">{product.description}</p>
            </section>

            {/* What's Inside */}
            <section>
              <h2 className="text-2xl font-extrabold border-b border-gray-800 pb-2 mb-4">
                What's Inside
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                {product.whatsInside?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Perfect For */}
            <section>
              <h2 className="text-2xl font-extrabold border-b border-gray-800 pb-2 mb-4">
                Perfect For
              </h2>
              <p className="text-gray-400 leading-relaxed">{product.perfectFor}</p>
            </section>

            {/* Format & License */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Format:</h3>
                <p className="text-gray-400">{product.format}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">License:</h3>
                <p className="text-gray-400">{product.license}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black opacit-95 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-5xl h-full flex flex-col justify-center items-center">
            <button className="absolute top-4 right-4 text-white z-10 p-2 bg-gray-800 bg-opacity-50 rounded-full">
              <X size={28} onClick={closeLightbox} />
            </button>
            <img
              src={product.images[lightboxImageIndex]}
              alt="product image"
              className="max-w-full max-h-full object-cover animate-fade-in"
            />
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 bg-gray-800 bg-opacity-50 rounded-full cursor-pointer"
              onClick={showPrevImage}>
              <ChevronLeft size={38} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 bg-gray-800 bg-opacity-50 rounded-full cursor-pointer"
              onClick={showNextImage}>
              <ChevronRight size={38} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Product
