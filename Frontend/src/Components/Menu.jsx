import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { BsBasket2 } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { LuSquareMenu } from "react-icons/lu";
import { IoRestaurantOutline } from "react-icons/io5";
import { FaFirstOrder } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
const Menu = ({user, onClose }) => {
    const [loading, setLoading] = useState(false);
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex justify-end" >
            {/* Menu container */}
            <div className="h-full max-w-sm w-full bg-white   shadow-lg p-4 relative" onClick={onClose}>
                <div className=''>
                    <h1 className='text-xl font-extrabold'>Zwiggato</h1>
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute cursor-pointer top-2 right-2 text-lg font-bold text-gray-700"
                    >
                        ✖
                    </button>
                </div>

                {/* Menu Options */}

                <div className='mt-6 p-4 flex flex-col gap-3'>
                    {/* profile */}
                    <Link to={"/profile"} className='flex items-center gap-4'>
                        <VscAccount className='text-xl'/>
                        <p>Profile</p>
                    </Link>
                    {/* orders */}
                    <Link to={"/order/status"} className='flex items-center gap-4'>
                        <BsBasket2 className='text-xl' />
                        <p>Order</p>
                    </Link>
                    {/* chart */}
                    <Link to={"/viewcart"} className='flex items-center gap-4'>
                        <FiShoppingCart className='text-xl' />
                        <p>Cart (0)</p>
                    </Link>
                    {user?.admin && (
                        <>
                            {/* Menu */}
                            <Link to={"/admin/menu"} className='flex items-center gap-4'>
                                <LuSquareMenu className='text-xl' />
                                <p>Menu</p>
                            </Link>

                            {/* Restaurant */}
                            <Link to={"/admin/restaurants"} className='flex items-center gap-4'>
                                <IoRestaurantOutline className='text-xl' />
                                <p>Restaurant</p>
                            </Link>

                            {/* Restaurant Orders */}
                            <Link to={"/admin/orders"} className='flex items-center gap-4'>
                                <FaFirstOrder className='text-xl' />
                                <p>Restaurant Orders</p>
                            </Link>
                        </>
                    )}

                </div>

                {/* Logout button */}
                <div className="absolute w-full flex  flex-col gap-4   bottom-0  left-0 mb-4">
                    <div className='flex items-center gap-4 mx-2'>
                        {user ? (
                            <>
                                <img src={user.profilePicture} alt="" className='h-14 w-14 rounded-full' />
                                <h1 className='font-bold text-2xl'>{user.name }</h1></>
                        ): (
                                <>
                                    <VscAccount className='text-2xl' />
                                    <h1 className='font-bold text-2xl'>Alice</h1>
                                </>
                        )}
                    </div>
                    <Link
                        disabled={loading}
                        className="relative flex mx-2 items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300"
                    >
                        {loading && (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? 'Please Wait...' : 'Logout'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Menu;
