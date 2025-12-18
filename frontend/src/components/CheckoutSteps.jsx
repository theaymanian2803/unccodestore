import React from 'react'
import { Link } from 'react-router-dom'

function CheckoutSteps({ step1, step2, step3, step4 }) {
  // Define a set of base classes for all buttons/steps
  const baseClasses =
    'p-3 rounded-2xl transition duration-200 ease-in-out text-base sm:text-lg lg:text-xl'
  // Define classes for active/clickable steps
  const activeClasses = 'bg-orange-400 hover:bg-orange-500 text-white shadow-md'
  // Define classes for disabled/non-clickable steps
  const disabledClasses = 'bg-gray-400 text-gray-700 cursor-not-allowed opacity-75'

  return (
    <div className=" text-black flex justify-center items-center p-3">
      <div className="flex justify-center items-center gap-2 sm:gap-4 flex-wrap">
        {/* Step 1: Sign In */}
        {step1 ? (
          <Link to="/login">
            <button className={`${baseClasses} ${activeClasses}`}>1. Sign In</button>
          </Link>
        ) : (
          <button className={`${baseClasses} ${disabledClasses}`} disabled>
            1. Sign In
          </button>
        )}

        {/* Separator - Optional, you might use a div or a dash */}

        {/* Step 2: Shipping */}
        {step2 ? (
          <Link to="/shipping">
            <button className={`${baseClasses} ${activeClasses}`}>2. Shipping</button>
          </Link>
        ) : (
          <button className={`${baseClasses} ${disabledClasses}`} disabled>
            2. Shipping
          </button>
        )}

        {/* Step 3: Payment */}
        {step3 ? (
          <Link to="/payment">
            <button className={`${baseClasses} ${activeClasses}`}>3. Payment</button>
          </Link>
        ) : (
          <button className={`${baseClasses} ${disabledClasses}`} disabled>
            3. Payment
          </button>
        )}

        {/* Step 4: Place Order */}
        {step4 ? (
          <Link to="/placeorder">
            <button className={`${baseClasses} ${activeClasses}`}>4. Place Order</button>
          </Link>
        ) : (
          <button className={`${baseClasses} ${disabledClasses}`} disabled>
            4. Place Order
          </button>
        )}
      </div>
    </div>
  )
}

export default CheckoutSteps
