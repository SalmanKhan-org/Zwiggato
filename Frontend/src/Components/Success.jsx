import React, { useEffect } from 'react'
import Image from '../assets/hero_pizza.png'
import { Link } from 'react-router-dom';
import { useOrderStore } from '../store/userOrderStore';

const Success = () => {
    const { orders, getOrderDetails } = useOrderStore();

    useEffect(() => {
        getOrderDetails();
    }, []);
    if (orders.length === 0) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <h1 className='font-bold text-2xl text-gray-700'>Orders not found!</h1>
            </div>
        )
    }
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50  px-4'>
            <div className='bg-white   shadow-lg rounded-lg p-6 max-w-lg w-full'>
                {
                    orders.map((order, index) => {
                        return (
                            <div key={index + order} className='mt-2'>
                                <div className='text-center mb-6  '>
                                    <h1 className='text-2xl font-bold text-gray-800 '>
                                        Order Status : <span className='text-orange-300'>{order?.status.toUpperCase()}</span>
                                    </h1>
                                </div>
                                <div className='mb-6'>
                                    <h2 className='text-lg font-semibold text-gray-700 mb-4'>Order Summary</h2>
                                    {/* Your ordered items will display here */}
                                    {order.cartItems.map((item, index) => {
                                        return (
                                            <div key={index+item} className='mb-4'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='flex items-center'>
                                                        <img
                                                            src={item.image}
                                                            alt=""
                                                            className='object-cover w-14 h-14 rounded-md '
                                                        />
                                                        <h3 className='ml-4 text-gray-800 font-medium '>{item.name }</h3>

                                                    </div>
                                                    <div className='text-right'>
                                                        <div className='text-gray-800 flex items-center'>
                                                            <span className='text-lg font-medium'>{item.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className='text-gray-300 mb-4' />
                                            </div>
                                       )
                                   })}
                                </div>
                            
                            </div>
                        )
                    })
                }
                <Link to={"/viewcart"}>
                    <button className='w-full text-white px-2 py-1 bg-orange-400 hover:bg-orange-500 transition-colors duration-300 cursor-pointer rounded-md'>Continue Shopping</button>
                </Link>
            </div>

        </div>
    )
}

export default Success
