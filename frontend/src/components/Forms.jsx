import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/userApiSlice'
import { setInforForUser } from '../slices/authSlice'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/'

  const [login, { isLoading }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setInforForUser({ ...res }))
    } catch (error) {
      console.error(error?.data?.messge || error.message)
    }
  }
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  return (
    // Outer container: Dark background, centered content
    <div className="min-h-[700px] bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800/20 p-8 md:p-10 rounded-lg shadow-2xl">
        {/* Welcome Header */}
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome back!</h1>

        {/* --- Login Form --- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-300 mb-2">
              EMAIL
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-900 text-white border-2 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg "
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-300 mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-900 text-white border-2 rounded-lg  text-lg
                          focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 text-sm font-semibold tracking-wider bg-white text-gray-900 rounded-lg transition duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
            LOG IN
          </button>
        </form>

        {/* Divider Line */}
        <hr className="my-8 border-gray-700" />

        {/* New Customer Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">New customer?</h2>

          {/* Create Account Button (Links to Register) */}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className="w-full py-3 text-sm font-semibold tracking-wider border-2 border-white text-white rounded-lg transition duration-200 hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 p-4">
            CREATE ACCOUNT
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
