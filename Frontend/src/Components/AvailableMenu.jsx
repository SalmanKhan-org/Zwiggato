import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore';

const AvailableMenu = ({menus}) => {
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCartStore();
  const  navigate = useNavigate();
  return (
    <div className='md:p-4 '>
      <h1 className='font-extrabold mb-6 text-xl md:text-2xl'>Available Menus</h1>
      <div className='flex flex-wrap gap-2  md:space-y-0'>
        {menus?.map((menu, index) => {
          return (
            <div key={index+menu} className='md:!w-52 w-full  shadow-lg rounded-lg overflow-hidden'>
              <img
                src={menu?.image}
                alt=""
                className='w-full h-40 object-cover'
              />
              <div className='p-4'>
                <h1 className='text-xl font-semibold !text-gray-800 dark:text-white'>{menu.name}</h1>
                <p className='text-gray-600 text-sm mt-2'>{menu.description }</p>
                <h3 className='text-lg font-semibold mt-4'>Price : <span className='text-orange-300'>${menu.price}</span></h3>
              </div>
              <div className='p-2'>
                <button
                  onClick={() => {
                    addToCart(menu)
                    navigate("/viewcart")
                  }}
                  disabled={loading}
                  className="relative cursor-pointer  flex  items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300"
                >
                  {loading && (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {loading ? 'Please Wait...' : 'Add to cart'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AvailableMenu
