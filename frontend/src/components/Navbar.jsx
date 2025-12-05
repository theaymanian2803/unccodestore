import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, ShoppingBag, Menu, X } from 'lucide-react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { cartItems } = useSelector((state) => state.cart)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    <nav className="sticky top-0 bg-black text-white px-5 md:px-10 py-3 flex justify-between items-center font-sans z-50">
      <Link to="/" className="flex flex-col items-start leading-none">
        <div className="text-4xl font-extrabold tracking-tight">EX</div>
        <div className="text-xs uppercase tracking-widest hidden md:block mt-0.5">EVANOX STORE</div>
      </Link>

      <ul className="hidden md:flex space-x-8 uppercase text-base font-medium">
        <li>
          <Link to="/" className="hover:text-gray-400 transition-colors">
            HOME
          </Link>
        </li>
        <li>
          <Link to="/store" className="hover:text-gray-400 transition-colors">
            PRODUCT
          </Link>
        </li>
        <li>
          <Link to="/store" className="hover:text-gray-400 transition-colors">
            STORE
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-400 transition-colors">
            ABOUT US
          </Link>
        </li>
      </ul>

      <div className="flex items-center space-x-6">
        <User className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors" />

        <div className="relative ">
          <ShoppingBag className="w-8 h-8 cursor-pointer hover:text-gray-400 transition-colors" />
          {cartItems.length > 0 && (
            <span className="bg-orange-400 p-3 text-black font-bold text-xl w-7 h-7 rounded-full flex justify-center items-center absolute -top-4 -right-5">
              {/* FIX 2: Ensure numeric addition in the reduce method */}
              {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
            </span>
          )}
        </div>

        <button onClick={toggleMenu}>
          {isOpen ? (
            <>
              <X className="w-6 h-6 cursor-pointer md:hidden hover:text-gray-400 transition-colors" />
            </>
          ) : (
            <>
              <Menu className="w-6 h-6 cursor-pointer md:hidden hover:text-gray-400 transition-colors" />
            </>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black shadow-lg md:hidden z-40 transition-all duration-300 ease-in-out">
          <ul className="flex flex-col space-y-4 py-4 px-6 uppercase text-base font-medium text-white">
            <li className="pb-1 border-b border-gray-800">
              <Link to="/" className="hover:text-gray-400 transition-colors" onClick={toggleMenu}>
                HOME
              </Link>
            </li>
            <li className="pb-1 border-b border-gray-800">
              <Link
                to="/store"
                className="hover:text-gray-400 transition-colors"
                onClick={toggleMenu}>
                PRODUCT
              </Link>
            </li>
            <li className="pb-1 border-b border-gray-800">
              <Link
                to="/store"
                className="hover:text-gray-400 transition-colors"
                onClick={toggleMenu}>
                STORE
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-gray-400 transition-colors"
                onClick={toggleMenu}>
                ABOUT US
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
