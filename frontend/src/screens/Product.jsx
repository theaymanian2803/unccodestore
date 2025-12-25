import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight, Zap, ShieldCheck, Clock } from 'lucide-react'
import Rating from './../components/Rating'
import { addToCart } from './../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProductDetailsQuery, useCreateReviewMutation } from './../slices/productSlice'
import { toast } from 'react-toastify'

function Product() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Queries & Mutations
  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(id)
  const [createReview, { isLoading: reviewIsLoading }] = useCreateReviewMutation()

  // Component State
  const [currentImage, setCurrentImage] = useState(null)
  const [isLightboxOpen, setIsLightBoxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const { userInfo } = useSelector((state) => state.auth)

  // Sync current image when product loads
  useEffect(() => {
    if (product?.images?.length > 0) {
      setCurrentImage(product.images[0])
    }
  }, [product])

  // Reset Qty when ID changes
  useEffect(() => {
    setQty(1)
  }, [id])

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  const reviewHandlerSubmit = async (e) => {
    e.preventDefault()
    try {
      await createReview({ productId: id, rating, comment }).unwrap()
      refetch()
      setRating(5)
      setComment('')
      toast.success('REVIEW_LOGGED_SUCCESSFULLY')
    } catch (err) {
      toast.error(err?.data?.message || 'SUBMISSION_FAILED')
    }
  }

  const openLightBox = (imgSrc) => {
    const index = product.images.indexOf(imgSrc)
    setLightboxImageIndex(index !== -1 ? index : 0)
    setIsLightBoxOpen(true)
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white font-black text-4xl italic animate-pulse tracking-widest">
          LOADING_SYSTEM...
        </h1>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-orange-600 font-black text-2xl uppercase">
          ERROR // {error?.data?.message || 'FETCH_FAILED'}
        </h1>
      </div>
    )

  return (
    <div className="min-h-screen bg-black text-white font-medium pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        {/* BREADCRUMB */}
        <div className="py-8 text-xs font-black uppercase tracking-[0.4em] text-zinc-500">
          <Link to="/" className="hover:text-white transition">
            HOME
          </Link>
          <span className="mx-4 text-zinc-800">//</span>
          <span className="text-orange-600 italic uppercase">
            EXCLUSIVE DESIGN FAST LANE Collection – Built for Speed, Not Excuses
          </span>
        </div>

        {/* MAIN PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT: IMAGES & SPECS */}
          <div className="space-y-10">
            <div
              className="bg-zinc-900 border-2 border-zinc-900 cursor-crosshair group relative overflow-hidden"
              onClick={() => openLightBox(currentImage)}>
              <img
                src={currentImage}
                alt="Product"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumbnail"
                  className={`w-24 h-24 object-cover cursor-pointer border-2 transition-all ${
                    currentImage === img ? 'border-orange-600' : 'border-zinc-800'
                  }`}
                  onClick={() => setCurrentImage(img)}
                />
              ))}
            </div>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-zinc-900">
              {product.otherFeatures?.map((f, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-lg font-black uppercase italic text-orange-600 flex items-center gap-2">
                    <Zap size={16} /> {f.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed uppercase">{f.text}</p>
                </div>
              ))}
            </div>

            {/* ADDITIONAL META (LIFETIME/COMPATIBILITY) */}
            <div className="grid grid-cols-2 gap-7 border-t border-zinc-900 pt-10">
              <div>
                <h3 className="text-lg font-bold mb-1 uppercase tracking-widest text-orange-600">
                  {product?.lifetimeAccess?.title}
                </h3>
                <p className="text-zinc-500 text-sm">{product?.lifetimeAccess?.text}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 uppercase tracking-widest text-orange-600">
                  {product?.programCompatibility?.title}
                </h3>
                <p
                  className="text-zinc-500 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: product?.programCompatibility?.text?.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong>$1</strong>'
                    ),
                  }}></p>
              </div>
            </div>
          </div>

          {/* RIGHT: BUY ACTIONS & DETAILS */}
          <div className="space-y-10">
            <div>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 italic ">
                {product.name}
              </h1>
              <div className="flex items-center gap-8 border-y border-zinc-900 py-6">
                <span className="text-4xl font-black text-orange-600 italic tracking-tighter">
                  ${product.price}
                </span>
                <Rating value={product.rating} text={`${product.numReviews || 0} REVIEWS`} />
              </div>
            </div>

            <div className="bg-zinc-900/30 p-8 border border-zinc-900 space-y-8">
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                <span className="text-zinc-500">SYSTEM_STATUS</span>
                <span className={product.countInStock > 0 ? 'text-emerald-500' : 'text-red-600'}>
                  {product.countInStock > 0 ? 'IN_STOCK' : 'DEPLETED'}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-zinc-600">
                    QUANTITY_SELECT
                  </label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full bg-black border border-zinc-800 p-4 text-white font-black outline-none focus:border-orange-600 appearance-none">
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="w-full py-6 bg-white text-black font-black text-xl uppercase tracking-tighter hover:bg-orange-600 hover:text-white transition-all duration-300 disabled:bg-zinc-800">
                add to cart
              </button>
            </div>

            {/* PRODUCT METADATA SECTIONS */}
            <div className="space-y-8">
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-orange-600 mb-4">
                  // Description
                </h2>
                <p className="text-zinc-400 text-lg font-medium leading-relaxed uppercase italic">
                  {product.description}
                </p>
              </section>

              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-orange-600 mb-4">
                  // What's Inside
                </h2>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 uppercase italic">
                  {product.whatsInside?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-orange-600 mb-4">
                  // Perfect For
                </h2>
                <p className="text-zinc-400 leading-relaxed uppercase italic">
                  {product.perfectFor}
                </p>
              </section>

              <section className="grid grid-cols-2 gap-6 border-t border-zinc-900 pt-6">
                <div>
                  <h3 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                    Format
                  </h3>
                  <p className="text-white font-black uppercase italic">{product.format}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                    License
                  </h3>
                  <p className="text-white font-black uppercase italic">{product.license}</p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="mt-40 border-t-2 border-zinc-900 pt-20">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-16">
            USER_<span className="text-orange-600">reviews</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Review List */}
            <div className="lg:col-span-7 space-y-8">
              {product?.reviews?.length === 0 ? (
                <div className="p-10 border-2 border-dashed border-zinc-900 text-zinc-700 font-black uppercase tracking-widest">
                  NO REVIEWS YET
                </div>
              ) : (
                product?.reviews?.map((r) => (
                  <div key={r._id} className="bg-zinc-900/20 p-8 border-l-4 border-orange-600">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-2xl font-black uppercase">{r.name}</h4>
                      <Rating value={r.rating} />
                    </div>
                    <p className="text-zinc-400 text-xl font-medium italic">"{r.comment}"</p>
                  </div>
                ))
              )}
            </div>

            {/* Review Form */}
            <div className="lg:col-span-5">
              {userInfo ? (
                <div className="bg-zinc-900/50 p-10 border border-zinc-800 space-y-8">
                  <h3 className="text-3xl font-black uppercase tracking-tighter">
                    SUBMIT_FEEDBACK
                  </h3>
                  <form onSubmit={reviewHandlerSubmit} className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-zinc-500 uppercase">
                        Rating_Score
                      </label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full bg-black border border-zinc-800 p-4 text-white font-bold outline-none focus:border-orange-600 appearance-none">
                        <option value="5">5 - MASTERPIECE</option>
                        <option value="4">4 - ELITE</option>
                        <option value="3">3 - STANDARD</option>
                        <option value="2">2 - SUBPAR</option>
                        <option value="1">1 - CRITICAL_FAIL</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-zinc-500 uppercase">
                        Comment
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-black border border-zinc-800 p-4 text-white font-bold outline-none focus:border-orange-600 h-32"
                        placeholder="ENTER_INTEL..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={reviewIsLoading}
                      className="w-full py-5 bg-orange-600 font-black uppercase italic hover:bg-white hover:text-black transition-all">
                      submit review
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-10 border border-zinc-900 text-center">
                  <Link
                    to="/login"
                    className="text-xl font-black text-orange-600 hover:text-white transition uppercase underline decoration-4 underline-offset-8">
                    SIGN IN TO REVIEW
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-6">
          <button
            onClick={() => setIsLightBoxOpen(false)}
            className="absolute top-10 right-10 text-white hover:text-orange-600 transition">
            <X size={48} strokeWidth={3} />
          </button>
          <img
            src={product.images[lightboxImageIndex]}
            alt="fullview"
            className="max-w-full max-h-[80vh] object-contain animate-in zoom-in duration-300"
          />
          <button
            onClick={() =>
              setLightboxImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
            }
            className="absolute left-10 text-white/20 hover:text-white transition">
            <ChevronLeft size={64} />
          </button>
          <button
            onClick={() =>
              setLightboxImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
            }
            className="absolute right-10 text-white/20 hover:text-white transition">
            <ChevronRight size={64} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Product
