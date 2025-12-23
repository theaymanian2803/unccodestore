import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlice'
import { resetCart } from './../slices/cartSlice'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const toggleAdminMenu = () => {
    setIsAdminOpen(!isAdminOpen)
  }

  const [logoutApiCall] = useLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      dispatch(resetCart())
      navigate('/')
    } catch (error) {
      console.log(error?.data?.message || error.message)
    }
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
            Store
          </Link>
        </li>
        <li>
          <Link to="/services" className="hover:text-gray-400 transition-colors">
            services
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-400 transition-colors">
            ABOUT US
          </Link>
        </li>
      </ul>

      <div onMouseLeave={() => setIsMenuOpen(false)} className="flex items-center space-x-6">
        <span className="flex justify-center items-center gap-2">
          {userInfo ? (
            <div className=" hidden md:block p-1">
              <span className="flex items-center space-x-1 cursor-pointer relative">
                <h1 className="text-xl uppercase font-semibold mb-1">{userInfo.name}</h1>
                <ChevronDown onClick={() => setIsMenuOpen(!isMenuOpen)} />
                {isMenuOpen && (
                  <div className="absolute  top-9 flex flex-col justify-start items-start bg-white text-black w-40 h-[130px] ">
                    <Link to="/profile" className=" p-2  text-xl capitalize">
                      profile
                    </Link>
                    <button onClick={logoutHandler} className=" p-2 text-xl capitalize">
                      logout
                    </button>
                    <Link to="/shipping" className=" p-2  text-xl capitalize">
                      shipping
                    </Link>
                  </div>
                )}
              </span>
            </div>
          ) : (
            <Link to="/login" className="p-1">
              <User className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors" />
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <span className="relative flex">
              <Link to="/admin/orderlistadmin" className="text-xl capitalize">
                admin
              </Link>
              {isAdminOpen && (
                <div className="absolute  top-9 flex flex-col justify-start items-start bg-white text-black w-40 h-[130px] ">
                  <Link to="/admin/orders" className=" p-2  text-xl capitalize">
                    orders
                  </Link>
                  <Link to="/admin/users" className=" p-2  text-xl capitalize">
                    users
                  </Link>
                  <Link to="/admin/productlistadmin" className=" p-2  text-xl capitalize">
                    products
                  </Link>
                </div>
              )}
              <ChevronDown onClick={() => setIsAdminOpen(!isAdminOpen)} />
            </span>
          )}
        </span>

        <Link to="/cart" className="relative ">
          <ShoppingBag className="w-8 h-8 cursor-pointer hover:text-gray-400 transition-colors" />
          {cartItems.length > 0 && (
            <span className="bg-orange-400 p-3 text-black font-bold text-xl w-7 h-7 rounded-full flex justify-center items-center absolute -top-4 -right-5">
              {/* FIX 2: Ensure numeric addition in the reduce method */}
              {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
            </span>
          )}
        </Link>

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
            <span onMouseLeave={() => setIsMenuOpen(false)}>
              {userInfo && (
                <div className="">
                  <span className="flex items-center space-x-1 cursor-pointer relative">
                    <h1 className="text-2xl uppercase font-semibold mb-1">{userInfo.name}</h1>
                    <ChevronDown onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    {isMenuOpen && (
                      <div className="absolute  top-9 flex flex-col justify-start items-start bg-white text-black w-40 h-[130px] ">
                        <Link to="/profile" className=" p-2  text-xl capitalize">
                          profile
                        </Link>
                        <button onClick={logoutHandler} className=" p-2 text-xl capitalize">
                          logout
                        </button>
                        <Link to="/shipping" className=" p-2  text-xl capitalize">
                          shipping
                        </Link>
                      </div>
                    )}
                  </span>
                </div>
              )}
            </span>
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
