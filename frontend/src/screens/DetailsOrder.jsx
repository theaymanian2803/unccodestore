import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from './../slices/orderApiSlice'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'
import { useDeliverOrderMutation } from './../slices/orderApiSlice'

import { toast } from 'react-toastify'

function DetailsOrder() {
  const { id: orderId } = useParams()
  const { userInfo } = useSelector((state) => state.auth)

  // Queries & Mutations
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
  const [deliverOrder, { isLoading: deliveryIsLoading }] = useDeliverOrderMutation()
  const [payOrder, { isLoading: paymentIsLoading }] = usePayOrderMutation()
  const {
    data: paypal,
    isLoading: paypalIsLoading,
    error: paypalError,
  } = useGetPayPalClientIdQuery()

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  // Load PayPal Script dynamically after client ID fetched
  useEffect(() => {
    if (!paypalError && !paypalIsLoading && paypal?.clientId && order && !order.isPaid) {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypal.clientId,
          currency: 'USD',
        },
      })
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
    }
  }, [order, paypal, paypalError, paypalIsLoading, paypalDispatch])

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => orderID)
  }

  async function onApprove(data, actions) {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details })
        refetch()
        console.log('Payment successful')
      } catch (err) {
        console.error(err?.data?.message || err.error)
      }
    })
  }

  function onError(err) {
    console.error('PayPal Error:', err)
  }

  async function onApproveTest() {
    try {
      await payOrder({ orderId, details: { payer: {} } })
      refetch()
      console.log('Test payment successful')
    } catch (err) {
      console.error(err)
    }
  }

  const deliveryHandler = async () => {
    try {
      await deliverOrder(orderId)
      refetch()
      toast.success('Order delivered successfully')
    } catch (error) {
      toast.error(error?.data?.message || error.error) || toast.error('Delivery failed')
    }
  }

  if (isLoading) return <div className="p-10 text-center font-bold text-xl">Loading Order...</div>
  if (error)
    return (
      <div className="p-10 text-center text-red-500 font-bold text-xl">
        {error?.data?.message || error.error}
      </div>
    )

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">Order Details</h1>
        <p className="text-gray-900 text-lg font-mono bg-gray-100 p-2 rounded inline-block">
          ID: {order._id}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Shipping</h2>
            <div className="space-y-3 text-gray-800 text-lg">
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
            </div>
            <div
              className={`mt-4 p-4 rounded-lg font-bold ${
                order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
              {order.isDelivered ? `Delivered on ${order.deliveredAt}` : 'Status: Not Delivered'}
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl text-black font-semibold mb-4 border-b pb-2">Payment Method</h2>
            <p className="text-lg text-black">
              <strong>Method:</strong> {order.paymentMethod}
            </p>
            <div
              className={`mt-4 p-4 rounded-lg font-bold ${
                order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
              {order.isPaid ? `Paid on ${order.paidAt?.substring(0, 10)}` : 'Status: Not Paid'}
            </div>
          </div>

          {/* Items */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Items</h2>
            <div className="divide-y divide-gray-100">
              {order.orderItems.map((item, index) => (
                <div key={index} className="py-4 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                  <Link
                    to={`/product/${item.product}`}
                    className="flex-1 text-orange-600 hover:underline font-medium">
                    {item.name}
                  </Link>
                  <div className="text-gray-700 font-bold whitespace-nowrap">
                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Summary & PayPal */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl sticky top-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Order Summary</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Items</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-extrabold text-black pt-4 border-t">
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {!order.isPaid && (
              <div className="mt-8 space-y-4">
                {paymentIsLoading && (
                  <div className="text-blue-500 animate-pulse">Processing Payment...</div>
                )}
                {isPending ? (
                  <div className="h-12 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center text-gray-400">
                    Loading PayPal...
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="min-h-[150px]">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    </div>
                    <button
                      onClick={onApproveTest}
                      className="w-full bg-gray-800 text-white font-bold py-2 rounded hover:bg-gray-900 transition">
                      Test Pay (Simulation)
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {deliveryIsLoading && (
            <div className="text-blue-500 animate-pulse">Processing Delivery...</div>
          )}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <button
              onClick={deliveryHandler}
              className="bg-amber-400 p-4 w-[400px] mt-7 cursor-pointer">
              DELIVER PLACE HOLDER BUTTON
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailsOrder
