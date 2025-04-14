/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useMenuStore } from '../store/useMenuStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditMenu = ({ onClose, input,setInput,menuId }) => {
    const { loading, updateMenu } = useMenuStore();
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setInput((prev) => ({
            ...prev, [name]: type === 'number' ? Number(value) : value
        }))
    }

    const handleSubmit = async() => {
        try {
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("description", input.description);
            formData.append("price", input.price.toString());
            formData.append("image", input.image);
            await updateMenu(formData, menuId);
            onClose();
        } catch (error) { toast.error(error.message) }
    }

    return (
        <div className='w-full h-full absolute  top-0 left-0 right-0 bottom-0  bg-black/30 backdrop-blur-md z-50   flex items-center justify-center'>
            <div className='w-full max-w-md p-4 bg-white  shadow-lg rounded-lg'>
                <div className='p-2 w-full flex items-center justify-between  '>
                    <h1 className='font-semibold font-xl'>Add a new Menu</h1>
                    <button className='cursor-pointer' onClick={onClose}><IoClose className='text-xl' /></button>
                </div>
                <p className='p-2 text-sm text-slate-500'>
                    Create a menu that will make your restaurant Stand out
                </p>
                <form>
                    <div className='mb-2 flex flex-col '>
                        <label htmlFor="name">Name</label>
                        <div className='border  bg-white p-2 rounded-lg flex items-center focus-within:ring-1'>
                            <input
                                type="text"
                                id='name'
                                name="name"
                                value={input.name}
                                onChange={handleInputChange}
                                placeholder='Enter Menu Name'
                                className='w-full h-full outline-none text-slate-600  '
                            />
                        </div>
                    </div>
                    <div className='mb-2 flex flex-col'>
                        <label htmlFor="description">Description</label>
                        <div className='border bg-white p-2 rounded-lg flex items-center focus-within:ring-1'>
                            <textarea
                                name="description"
                                id="description"
                                value={input.description}
                                onChange={handleInputChange}
                                placeholder='Enter the Description'
                                className='w-full h-full outline-none text-slate-600'
                            ></textarea>
                        </div>
                    </div>
                    <div className='mb-2 flex flex-col '>
                        <label htmlFor="price">Price (in rupees)</label>
                        <div className='border  p-2 rounded-lg flex items-center focus-within:ring-1'>
                            <input
                                type="number"
                                id='price'
                                name='price'
                                value={input.price}
                                onChange={handleInputChange}
                                placeholder='Price'
                                className='w-full h-full outline-none  text-slate-600 '
                            />
                        </div>
                    </div>
                    <div className='mb-2 flex flex-col '>
                        <p >Upload Restaurant Banner</p>
                        <label className='flex flex-col'>
                            <div className='border border-slate-300 w-full rounded-md p-2 '>
                                <p className='text-slate-400'> Click to an Upload Image</p>
                                <input type="file" name='image' onChange={(e) => setInput({
                                    ...input,
                                    image: e.target.files[0] || undefined,
                                })} className='hidden' />
                            </div>
                        </label>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="relative cursor-pointer w-full  flex  items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300"
                    >
                        {loading && (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? 'Please Wait...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditMenu
