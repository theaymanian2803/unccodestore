import React from 'react'
import { Link } from 'react-router-dom'
import { useGetOrdersQuery } from '.././../slices/orderApiSlice'

function OrderListAdmin() {
  const { data: orders, isLoading, error } = useGetOrdersQuery()
  if (isLoading) return <div className="p-10 text-center font-bold text-xl">Loading Orders...</div>
  if (error)
    return (
      <div className="p-10 text-center font-bold text-xl">
        errorr {error?.data?.message || error.message}..
      </div>
    )
  return (
    <div className="container mx-auto w-full h-screen ">
      <h1 className="text-2xl font-bold text-center capitalize p-3 mb-4">orders</h1>
      <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase">
              <th className="py-4 px-3">ID</th>
              <th className="py-4 px-3">DATE</th>
              <th className="py-4 px-3">User</th>
              <th className="py-4 px-3">TOTAL</th>
              <th className="py-4 px-3">PAID</th>
              <th className="py-4 px-3">DELIVERED</th>
              <th className="py-4 px-3 text-center">DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="py-4 px-3 font-mono text-xs text-blue-400">{order._id}</td>
                  <td className="py-4 px-3 text-sm">
                    {order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}
                  </td>
                  <td className="py-4 px-3 text-sm">{order.user && order.user.name}</td>
                  <td className="py-4 px-3 text-sm font-bold">
                    ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
                  </td>
                  <td className="py-4 px-3 text-sm">
                    {order.isPaid ? (
                      <span className="text-green-500">{order.paidAt?.substring(0, 10)}</span>
                    ) : (
                      <span className="text-red-500 font-bold">✘</span>
                    )}
                  </td>
                  <td className="py-4 px-3 text-sm">
                    {order.isDelivered ? (
                      <span className="text-green-500">{order.deliveredAt?.substring(0, 10)}</span>
                    ) : (
                      <span className="text-red-500 font-bold">✘</span>
                    )}
                  </td>
                  <td className="py-4 px-3 text-center">
                    <Link
                      to={`/order/${order._id}`}
                      className="inline-block bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold py-2 px-6 rounded transition duration-200">
                      DETAILS
                    </Link>
                  </td>
                </tr>
              ))}
            {(!orders || orders.length === 0) && (
              <tr>
                <td colSpan="6" className="py-20 text-center text-gray-500">
                  No orders found in your history.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderListAdmin
