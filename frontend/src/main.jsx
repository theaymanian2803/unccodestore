import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import About from './screens/About'
import Home from './screens/Home'
import Store from './screens/Store'
import NotFound from './screens/NotFound'
import Product from './screens/Product'
import Cart from './screens/Cart'
import LoginPage from './screens/LoginPage'
import Profile from './screens/Profile'
import Register from './screens/Register'
import Shipping from './screens/Shipping'
import Payment from './screens/Payment'
import PlaceOrder from './screens/PlaceOrder'

import { Provider } from 'react-redux'
import store from './store'
import PrivateRoutes from './components/PrivateRoutes'
import DetailsOrder from './screens/DetailsOrder'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/store',
        element: <Store />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },

      {
        path: '',
        element: <PrivateRoutes />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
          {
            path: '/shipping',
            element: <Shipping />,
          },
          {
            path: '/payment',
            element: <Payment />,
          },
          {
            path: '/placeorder',
            element: <PlaceOrder />,
          },
          {
            path: '/order/:id',
            element: <DetailsOrder />,
          },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
)
