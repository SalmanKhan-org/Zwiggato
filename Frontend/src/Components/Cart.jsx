import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { VscAccount } from 'react-icons/vsc';
import CheckoutConfirmPage from './CheckoutConfirmPage';
import { useCartStore } from '../store/useCartStore';

const Cart = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { cart, incrementQuantity, decrementQuantity, removeFromCart , clearCart} = useCartStore();
    const totalPrice = cart?.reduce((acc, ele) => acc + ele.price * ele.quantity,0);
  return (
    <div className='flex flex-col max-w-7xl mx-auto my-10'>
          <div className='flex justify-end'>
              <button
                  onClick={()=>clearCart()}
                  disabled={loading}
                  className="relative cursor-pointer  flex  items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300"
              >
                  {loading && (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {loading ? 'Please Wait...' : 'Clear All'}
              </button>
          </div>
          <table className="w-full border-collapse border border-gray-200 shadow-md rounded-lg mt-2">
              <thead className="bg-gray-200 text-gray-700">
                  <tr>
                      <th className="p-3 text-left">Item</th>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Quantity</th>
                      <th className="p-3 text-left">Total</th>
                      <th className="p-3 text-right">Remove</th>
                  </tr>
              </thead>

              <tbody>
                  {
                      cart?.length>0 ? cart?.map((item,index) => {
                          return (
                              <tr key={item+index} className="bg-gray-50 border-b border-gray-200">
                                  <td className=" h-14 w-14 p-3 text-center">
                                      <img src={item.image} className='h-full w-full rounded-full' alt="" />
                                  </td>
                                  <td className="p-3">{item.name}</td>
                                  <td className="p-3">{item.price}</td>
                                  <td className="p-3">
                                      <div className="w-fit flex items-center rounded-full border border-gray-300 bg-white shadow-sm gap-2 px-2 py-1">
                                          <button onClick={() =>decrementQuantity(item._id)} className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer">
                                              <FaMinus />
                                          </button>
                                          <span className="font-bold">{item.quantity }</span>
                                          <button onClick={()=>incrementQuantity(item._id)} className="p-2 rounded-full bg-orange-300 hover:bg-orange-400 cursor-pointer">
                                              <FaPlus />
                                          </button>
                                      </div>
                                  </td>
                                  <td className="p-3">{ item.price * item.quantity}</td>
                                  <td className="p-3 flex justify-end">
                                      <button
                                          onClick={()=>removeFromCart(item._id)}
                                          disabled={loading}
                                          className="relative flex items-center justify-center gap-2 px-4 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300 cursor-pointer"
                                      >
                                          {loading && (
                                              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                          )}
                                          {loading ? "Please Wait..." : "Remove"}
                                      </button>
                                  </td>
                              </tr>
                          )
                      }) : (
                              <div>No items in cart</div>
                      )
                  }
              </tbody>

              <tfoot className="bg-gray-100 font-semibold">
                  <tr>
                      <td className="p-3" colSpan="4">Total</td>
                      <td className="p-3">{ totalPrice}</td>
                      <td></td>
                  </tr>
              </tfoot>
          </table>
          <div className='flex justify-end my-5'>
              <button
                  disabled={loading}
                  onClick={()=>setOpen(true)}
                  className="relative flex items-center justify-center gap-2 px-4 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300 cursor-pointer"
              >
                  {loading && (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {loading ? "Please Wait..." : "Proceed to Checkout"}
              </button>
          </div>
          {open && (
              <CheckoutConfirmPage onClose={()=>setOpen(false) } />
          )}
    </div>
  )
}

export default Cart
