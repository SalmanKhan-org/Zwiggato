import React, { useEffect } from 'react'
import { useRestaurantStore } from '../store/useRestaurantStore'

const Orders = () => {
    const { restaurantOrders, getRestaurantOrders, updateRestaurantOrder } = useRestaurantStore();
    
    const handleStatusChange =async (orderId,status) => {
        await updateRestaurantOrder(orderId, status);
    }
    useEffect(() => {
        getRestaurantOrders();
    }, []);
  return (
    <div className='max-w-6xl mx-auto py-10 px-6'>
          <h1 className='text-3xl font-extrabold text-gray-900 mb-10'>Orders Overview</h1>
          <div className='space-y-8'>
              {/* Restaurant orders display here */}
              {restaurantOrders.map((order, index) => {
                  return (
                      <div key={index+order} className='flex flex-col md:flex-row justify-between items-start sm:items-center bg-white shadow-lg rounded-xl p-6 border-gray-200  sm:p-8'>
                          <div className='flex-1 mb-6 sm:mb-8'>
                              <h1 className='text-xl font-semibold text-gray-800 '>{order.deliveryDetails.name}</h1>
                              <p className='text-gray-600'>
                                  <span className='font-semibold'>Address :  {order.deliveryDetails.address}</span>
                              </p>
                              <p className='text-gray-600 mt-2'>
                                  <span className='font-semibold'>Total Amount : {order.totalPrice} </span>
                              </p>
                          </div>
                          <div className='w-full sm:w-1/3 flex flex-col'>
                              <label htmlFor="orderStatus">{order.status}</label>
                              <select onChange={(e)=> handleStatusChange(order._id,e.target.value.toLowerCase())} name="orderStatus" id="orderStatus" className='border border-gray-300 px-2 py-1 rounded-md'>
                                  <option >Select Status</option>
                                  {
                                      ["Pending", "Confirmed", "Preparing", "OutForDelivery", "Delivered"].map((option, index) => {
                                          return <option key={option + index} value={option}>{option}</option>
                                      })
                                  }
                              </select>
                          </div>
                      </div>
                  )
              })}
          </div>
    </div>
  )
}

export default Orders
