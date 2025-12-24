import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from './../slices/orderApiSlice'

// A "Glowing" Status Badge for black backgrounds
const StatusIndicator = ({ condition, trueText, falseText, date }) => (
  <div
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
      condition
        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
        : 'bg-amber-500/5 border-amber-500/20 text-amber-400'
    }`}>
    <div
      className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${
        condition ? 'bg-emerald-400' : 'bg-amber-400'
      }`}
    />
    <span className="text-xs font-bold uppercase tracking-wider">
      {condition ? `${trueText} ${date?.substring(0, 10)}` : falseText}
    </span>
  </div>
)

function DetailsOrder() {
  const { id: orderId } = useParams()
  const { userInfo } = useSelector((state) => state.auth)

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
  const [deliverOrder, { isLoading: deliveryIsLoading }] = useDeliverOrderMutation()
  const [payOrder, { isLoading: paymentIsLoading }] = usePayOrderMutation()
  const {
    data: paypal,
    isLoading: paypalIsLoading,
    error: paypalError,
  } = useGetPayPalClientIdQuery()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  useEffect(() => {
    if (!paypalError && !paypalIsLoading && paypal?.clientId && order && !order.isPaid) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: { 'client-id': paypal.clientId, currency: 'USD' },
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      loadPayPalScript()
    }
  }, [order, paypal, paypalError, paypalIsLoading, paypalDispatch])

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details })
        refetch()
        toast.success('Payment Received')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    })
  }

  const deliveryHandler = async () => {
    try {
      await deliverOrder(orderId)
      refetch()
      toast.success('Order Marked as Delivered')
    } catch (error) {
      toast.error(error?.data?.message || 'Delivery update failed')
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-mono tracking-widest uppercase italic">
        Loading System...
      </div>
    )
  if (error)
    return (
      <div className="min-h-screen bg-black p-10 text-red-500 font-bold">
        {error?.data?.message || error.error}
      </div>
    )

  return (
    <div className="bg-black min-h-screen text-white pb-20 selection:bg-indigo-500/30">
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        {/* Header - Minimalist */}
        <div className="mb-12">
          <Link
            to="/orders"
            className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition flex items-center mb-6">
            <span className="mr-2">←</span> Return to History
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tighter mb-2">
                Order <span className="text-indigo-500">Overview</span>
              </h1>
              <p className="font-mono text-zinc-500 text-lg tracking-tight">REF_ID: {order._id}</p>
            </div>
            <div className="flex flex-wrap gap-3 ">
              <StatusIndicator
                condition={order.isPaid}
                trueText="Verified"
                falseText="Unpaid"
                date={order.paidAt}
                className="text-2xl"
              />
              <StatusIndicator
                condition={order.isDelivered}
                trueText="Shipped"
                falseText="Processing"
                date={order.deliveredAt}
                className="text-2xl"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Logistic & Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-900/30 border border-zinc-800/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="space-y-4">
                <h3 className="text-zinc-500 text-xl font-black uppercase tracking-widest">
                  Shipment To
                </h3>
                <div className="space-y-1">
                  <p className="text-2xl  tracking-tight font-bold">{order.user.name}</p>
                  <p className="text-zinc-400 text-2xl">{order.user.email}</p>
                  <p className="text-zinc-400 text-2xl pt-2 leading-relaxed">
                    {order.shippingAddress.address}, {order.shippingAddress.city}
                    <br />
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                </div>
              </div>
              <div className="space-y-4 border-t md:border-t-0 md:border-l border-zinc-800/50 pt-6 md:pt-0 md:pl-8">
                <h3 className="text-zinc-500 text-xl font-black uppercase tracking-widest">
                  Payment Info
                </h3>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{order.paymentMethod}</p>
                  <p
                    className={`text-xl font-bold ${
                      order.isPaid ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                    {order.isPaid ? 'Transaction Completed' : 'Waiting for payment...'}
                  </p>
                </div>
              </div>
            </div>

            {/* Item Manifest */}
            <div className="space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 border-b border-zinc-800 pb-4">
                Manifest
              </h2>
              <div className="divide-y divide-zinc-900">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="py-6 flex items-center gap-6 group">
                    <div className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover opacity-80 group-hover:opacity-100 transition duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-lg font-bold hover:text-indigo-400 transition truncate block">
                        {item.name}
                      </Link>
                      <p className="text-zinc-500 font-mono text-xl mt-1">
                        QTY: {item.qty} &times; ${item.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl tracking-tighter text-white">
                        ${(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout/Sidebar Column */}
          <div className="lg:col-span-1">
            <div className="bg-white text-black p-8 rounded-2xl sticky top-8 shadow-[0_20px_50px_rgba(255,255,255,0.05)] border border-white">
              <h2 className="text-2xl font-black tracking-tighter mb-8 border-b border-zinc-100 pb-4">
                Final Statement
              </h2>

              <div className="space-y-4 font-medium text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-black font-bold">${order.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-black font-bold">${order.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-black font-bold">${order.taxPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-6 border-t border-zinc-200 mt-6">
                  <span className="text-black font-black text-xl">Total</span>
                  <span className="text-black font-black text-3xl tracking-tighter">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {!order.isPaid && (
                <div className="mt-10 space-y-4">
                  {isPending ? (
                    <div className="h-[150px] bg-zinc-50 animate-pulse rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Syncing Gateway...
                    </div>
                  ) : (
                    <div className="min-h-[150px]">
                      {paymentIsLoading && (
                        <div className="text-xs font-bold text-indigo-600 mb-2 animate-pulse uppercase">
                          Authorization in progress...
                        </div>
                      )}
                      <PayPalButtons
                        createOrder={(data, actions) =>
                          actions.order.create({
                            purchase_units: [{ amount: { value: order.totalPrice } }],
                          })
                        }
                        onApprove={onApprove}
                        style={{
                          layout: 'vertical',
                          color: 'black',
                          shape: 'rect',
                          label: 'checkout',
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Admin Actions Container */}
              {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                <div className="mt-8 pt-6 border-t border-zinc-200">
                  <button
                    onClick={deliveryHandler}
                    disabled={deliveryIsLoading}
                    className="w-full bg-black text-white font-black py-4 rounded-xl hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 uppercase tracking-widest text-xs">
                    {deliveryIsLoading ? 'Processing...' : 'Mark as Dispatched'}
                  </button>
                </div>
              )}
            </div>

            <p className="text-center text-zinc-600 text-[10px] mt-6 font-bold uppercase tracking-[0.2em] px-4">
              Secure Checkout • Encrypted Transaction
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsOrder
