import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useCreateOrderMutation } from './../slices/orderApiSlice'
import { clearCart } from './../slices/cartSlice'

function Orders() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.shippingAddress, cart.paymentMethod, navigate])

  const [createOrder, { isLoading, error }] = useCreateOrderMutation()
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()
      dispatch(clearCart())
      navigate(`/order/${res._id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto w-full h-screen">
      <h1 className="text-2xl font-bold text-center capitalize  p-5">shopping summary</h1>
      <div className="flex-col md:flex md:flex-row w-10/12   mx-auto gap-7">
        <div className="flex-1">
          <h1 className="text-3xl tracking-widest uppercase font-bold mt-2">address</h1>
          <div className="flex gap-3.5 text-xl  font-thin capitalize text-orange-200 ">
            <p>{cart.shippingAddress.address}</p>
            <p>{cart.shippingAddress.city}</p>
            <p>{cart.shippingAddress.postalCode}</p>
            <p>{cart.shippingAddress.country}</p>
          </div>
          <h1 className="text-3xl tracking-widest uppercase font-bold px-2 mt-5">Payment method</h1>
          <div>
            <p className="text-2xl  font-thin capitalize text-orange-200 mt-2">
              {cart.paymentMethod}
            </p>
          </div>
          <div>
            <h1 className="text-3xl tracking-widest uppercase font-bold px-2 mt-5">
              order items ({cart.cartItems.length})
            </h1>
            {cart.cartItems.length === 0 ? (
              <div>
                <h1>cart is empty</h1>
              </div>
            ) : (
              <div>
                {cart.cartItems.map((item) => (
                  <div key={item._id}>
                    <img
                      src={item.images[0]}
                      alt="order-image"
                      className="h-[200px] w-[200px] rounded-2xl object-cover mt-3 mb-3"
                    />
                    <div className=" flex items-center justify-between bg-orange-500 p-2">
                      <Link to={`/product/${item._id}`}>
                        <h1 className="text-sm md:text-xl ">{item.name.slice(0, 20)}...</h1>
                      </Link>
                      <h1 className="text-sm md:text-xl ">
                        {item.qty} x MAD{item.price} = MAD{item.qty * item.price}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <section className="bg-black-50 p-6 rounded-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Total</h2>
              <h2 className="text-2xl font-bold">{cart.totalPrice} MAD</h2>
            </div>

            {/* Order Breakdown */}
            <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between text-white text-2xl">
                <span>Subtotal (Items)</span>
                <span>{cart.itemsPrice} MAD</span>
              </div>
              <div className="flex justify-between text-white text-2xl">
                <span>Shipping</span>
                <span>{cart.shippingPrice} MAD</span>
              </div>
              <div className="flex justify-between text-white text-2xl">
                <span>Tax</span>
                <span>{cart.taxPrice} MAD</span>
              </div>

              <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200 mt-2">
                <span>Order Total</span>
                <span>{cart.totalPrice} MAD</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="button"
              disabled={cart.cartItems.length === 0 || isLoading}
              onClick={placeOrderHandler}
              className="w-full bg-black text-white py-4 mt-8 text-sm uppercase font-bold tracking-wider hover:bg-gray-800 disabled:bg-gray-400 transition-colors">
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-4 text-red-500 text-sm text-center">
                {error?.data?.message || 'An error occurred'}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Orders
