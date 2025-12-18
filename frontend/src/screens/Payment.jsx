import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from './../components/CheckoutSteps'
import { savePaymentMethod } from './../slices/cartSlice'
function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping')
    }
  }, [shippingAddress, navigate])
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div
        className="container flex justify-center items-center mx-auto p-4 w-full h-[600px] text-2xl
      ">
        <form onSubmit={submitHandler}>
          <p className="text-2xl font-medium text-white mb-4">Select Method</p>

          <div className="flex items-center space-x-2 mb-6">
            <label htmlFor="paypal" className="flex items-center cursor-pointer text-gray-700">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked
              />

              <span className="ml-2 text-white ">PayPal or Credit Card</span>
            </label>
          </div>

          <button
            type="submit"
            className="
                    bg-slate-700 hover:bg-slate-800 
                    text-white font-medium 
                    py-2 px-4 
                    rounded-md 
                    transition duration-200 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-opacity-50
                ">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default Payment
