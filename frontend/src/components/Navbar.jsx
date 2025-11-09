import React, { useState } from 'react'
// Import the necessary icons from lucide-react
import { Link } from 'react-router-dom'
import { User, ShoppingBag, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  return (
    // Outer Nav Bar Container: Black background, white text, padding, flex layout
    <nav className="sticky top-0 bg-black text-white px-5 md:px-10 py-3 flex justify-between items-center font-sans z-50">
      {/* Left Section: Logo and Name */}
      <Link to="/" className="flex flex-col items-start leading-none">
        <div className="text-4xl font-extrabold tracking-tight">EX</div>
        <div className="text-xs uppercase tracking-widest hidden md:block mt-0.5">EVANOX STORE</div>
      </Link>

      {/* Center Section: Navigation Links - Hidden on small screens (mobile-first approach) */}
      {/* 'md:flex' makes it visible from medium screens up */}
      <ul className="hidden md:flex space-x-8 uppercase text-base font-medium">
        {/* Use cursor-pointer and hover effects for interactivity */}
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

      {/* Right Section: Icons and Menu */}
      <div className="flex items-center space-x-6">
        {/* User Icon */}
        <User className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors" />

        {/* Shopping Bag Icon */}
        <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors" />

        {/* Hamburger Menu Icon - Visible on small screens, hidden on medium screens and up */}

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
          {/* Mobile Links List */}
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
