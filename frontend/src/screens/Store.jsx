import React from 'react'
const cartItems = [
  {
    name: 'aymane',
  },
]
function Store() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-normal my-8">Your cart</h1>

      {/* Cart Header */}
      <div className="grid grid-cols-12 text-sm text-gray-500 border-b pb-2">
        <span className="col-span-6 uppercase">Product</span>
        <span className="col-span-3 text-center uppercase">Quantity</span>
        <span className="col-span-3 text-right uppercase">Total</span>
      </div>

      {/* Cart Items List */}
      {cartItems.map((item) => (
        <div className="grid grid-cols-12 items-start py-6 border-b">
          {/* Product Details (Span 6) */}
          <div className="col-span-6 flex items-start space-x-4">
            <img src="" className="w-20 h-24 object-cover" />
            <div>
              <p className="font-semibold text-sm"></p>
              <p className="text-xs text-gray-600">COLOR: </p>
              <p className="text-xs text-gray-600">SIZE: </p>
            </div>
          </div>

          {/* Quantity Controls (Span 3) */}
          <div className="col-span-3 flex justify-center items-center h-full">
            <div className="flex border border-gray-300">
              <button className="w-8 h-8 text-center text-sm">-</button>
              <input
                type="text"
                readOnly
                className="w-8 h-8 text-center text-sm border-l border-r border-gray-300 outline-none"
              />
              <button className="w-8 h-8 text-center text-sm">+</button>
            </div>
            {/* Red 'Remove' button/icon */}
            <button className="ml-4 text-red-500 text-lg hover:opacity-75" aria-label="Remove item">
              &#128465; {/* Trash Can Icon */}
            </button>
          </div>

          {/* Total Price (Span 3) */}
          <div className="col-span-3 text-right font-medium"></div>
        </div>
      ))}
      {/* --- Section Divider --- */}
      <div className="flex justify-between mt-4">
        {/* Left Side: Continue Shopping & Notes */}
        <div className="w-1/2 pr-10 space-y-4">
          <p className="text-sm underline cursor-pointer hover:text-gray-700">Continue shopping</p>

          <div className="border-b py-4">
            <p className="flex justify-between text-sm cursor-pointer hover:text-gray-700">
              <span>Add notes</span>
              <span>+</span>
            </p>
          </div>

          <div className="border-b py-4">
            <p className="flex justify-between text-sm cursor-pointer hover:text-gray-700">
              <span>Estimate shipping</span>
              <span>+</span>
            </p>
          </div>
        </div>

        {/* Right Side: Subtotal, Discounts, Checkout */}
        <div className="w-1/2 space-y-4">
          {/* Subtotal Display (Matching the image style) */}
          <div className="flex justify-end text-right font-medium text-lg">sub</div>

          {/* Discounts */}
          <div className="border-b py-2">
            <p className="flex justify-between text-sm cursor-pointer hover:text-gray-700">
              <span>Discounts</span>
              <span>+</span>
            </p>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              id="terms"
              className="form-checkbox text-black rounded-none border-gray-300"
            />
            <label htmlFor="terms" className="ml-2 text-xs">
              I agree with the <span className="underline">terms and conditions</span>
            </label>
          </div>

          {/* Checkout Button */}
          <button className="w-full bg-black text-white py-3 uppercase text-sm font-semibold hover:bg-gray-800 transition-colors">
            CHECKOUT
          </button>

          <p className="text-xs text-center text-gray-500 pt-1">
            Taxes and <span className="underline">shipping</span> calculated at checkout
          </p>
        </div>
      </div>
    </div>
  )
}

export default Store
