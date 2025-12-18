import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from './../slices/cartSlice'
import CheckoutSteps from './../components/CheckoutSteps'

function Shipping() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
  const [country, setCountry] = useState(shippingAddress?.country || '')
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className="container flex justify-center items-center mx-auto p-4 w-full h-[600px] ">
        {/* Removed h-full from the form, allowing it to take only the space its content needs */}
        <form
          onSubmit={submitHandler}
          className="text-2xl mx-auto w-full max-w-lg p-8 bg-gray-900/50 rounded-lg shadow-xl flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Shipping Details</h2>

          {/* Address Field */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-lg font-medium text-gray-300 mb-1">
              Address
            </label>
            {/* Added standard dark-theme Tailwind classes for input */}
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* City Field */}
          <div className="flex flex-col">
            <label htmlFor="city" className="text-lg font-medium text-gray-300 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Postal Code Field */}
            <div className="flex flex-col">
              <label htmlFor="postalCode" className="text-lg font-medium text-gray-300 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Country Field */}
            <div className="flex flex-col">
              <label htmlFor="country" className="text-lg font-medium text-gray-300 mb-1">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-300 transition duration-200">
            continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default Shipping
