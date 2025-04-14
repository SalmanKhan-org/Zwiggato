import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useCartStore } from '../store/useCartStore';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { useUserStore } from '../store/useUserStore';
import { useOrderStore } from '../store/userOrderStore';
import { toast } from 'react-toastify';

const CheckoutConfirmPage = ({ onClose }) => {
    const { user } = useUserStore();
    const [input, setInput] = useState({
        name: user?.name || "",
        email: user?.email || "",
        contact: user?.contact || "",
        address: user?.address || "",
        city: user?.city|| "",
        country:user.country || ""
    });
    const { cart } = useCartStore();
    const { singleRestaurant } = useRestaurantStore();
    const { createCheckoutSession, loading } = useOrderStore();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => {
            return {
                ...prev,[name]:value
            }
        })
    }

    const checkoutHandler = async (e) => {
        e.preventDefault(); 
        try {
            const totalPrice = cart?.reduce((acc, ele) => acc + ele.price * ele.quantity, 0);
            const checkoutData = {
                cartItems: cart.map((cartItem) => ({
                    menuId: cartItem._id,
                    name: cartItem.name,
                    image: cartItem.image,
                    price: cartItem.price,
                    quantity : cartItem.quantity
                })),
                deliveryDetails: input,
                restaurant: singleRestaurant?._id,
                totalPrice
            }
            await createCheckoutSession(checkoutData);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className='w-full h-full absolute  top-0 left-0 right-0 bottom-0  bg-black/30 backdrop-blur-md z-50  flex items-center justify-center'>
            <div className='w-full max-w-md p-4 bg-white  shadow-lg rounded-lg'>
                <div className='p-2 w-full flex items-center justify-between  '>
                    <h1 className='font-semibold font-xl'>Review Your Order</h1>
                    <button className='cursor-pointer' onClick={onClose}><IoClose className='text-xl' /></button>
                </div>
                <p className='p-2 text-sm text-slate-500'>
                    Double check your Delivery details and ensure everything is correct.
                    When you are ready, hit the confirm button to finalize your order
                </p>
                <form onSubmit={checkoutHandler}>
                    <div className='mb-2 flex flex-col '>
                        <label htmlFor="name">FullName</label>
                        <div className='border  bg-white p-2 rounded-lg flex items-center focus-within:ring-1'>
                            <input
                                type="text"
                                id='name'
                                name="name"
                                value={input.name}
                                onChange={handleInputChange}
                                placeholder='Username'
                                className='w-full h-full outline-none text-slate-600  '
                            />
                        </div>
                    </div>
                    <div className='mb-2 flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <div className='border bg-white p-2 rounded-lg flex items-center focus-within:ring-1'>
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={handleInputChange}
                                placeholder='Email'
                                className='w-full h-full outline-none text-slate-600  '
                            />
                        </div>
                    </div>
                    <div className='mb-2 flex flex-col '>
                        <label htmlFor="contact">Contact</label>
                        <div className='border  p-2 rounded-lg flex items-center focus-within:ring-1'>
                            <input
                                type="text"
                                id='contact'
                                name='contact'
                                value={input.contact}
                                onChange={handleInputChange}
                                placeholder='Contact'
                                className='w-full h-full outline-none  text-slate-600 '
                            />
                        </div>
                    </div>
                    <div className='mb-2 flex flex-col '>
                        <label htmlFor="address">Address</label>
                        <div className='border  p-2 rounded-lg flex items-center focus-within:ring-1'>
                            <input
                                type="text"
                                name='address'
                                value={input.address}
                                onChange={handleInputChange}
                                placeholder='Address'
                                className='w-full h-full outline-none  text-slate-600 '
                            />
                        </div>
                    </div>
                    <div className='mb-2 flex flex-col '>
                        <label htmlFor="address">City</label>
                        <div className='border  p-2 rounded-lg flex items-center focus-within:ring-1'>
                            <input
                                type="text"
                                name='city'
                                value={input.city}
                                onChange={handleInputChange}
                                placeholder='City'
                                className='w-full h-full outline-none  text-slate-600 '
                            />
                        </div>
                    </div>
                    <div className='mb-2 flex flex-col '>
                        <label htmlFor="address">Country</label>
                        <div className='border  p-2 rounded-lg flex items-center focus-within:ring-1'>
                            <input
                                type="text"
                                name='country'
                                value={input.country}
                                onChange={handleInputChange}
                                placeholder='country'
                                className='w-full h-full outline-none  text-slate-600 '
                            />
                        </div>
                    </div>
                    <button
                            type='submit'
                            disabled={loading}
                            className="relative cursor-pointer w-full  flex  items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300"
                        >
                            {loading && (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            )}
                            {loading ? 'Please Wait...' : 'Continue to Payment'}
                        </button>
                </form>
            </div>
        </div>
    )
}

export default CheckoutConfirmPage
