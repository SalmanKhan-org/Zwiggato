import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FilterPage from './FilterPage';
import Loading from './Loading';
import { IoMdClose } from "react-icons/io";
import HereImage from '../assets/hero_pizza.png';
import { CiGlobe } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { useRestaurantStore } from '../store/useRestaurantStore';
import { useEffect } from 'react';

const SearchPage = () => {
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState("");
    const { searchedRestaurants, searchRestaurant , loading, appliedFilter, setAppliedFilter} = useRestaurantStore();

    const handleChangeSearch = (e) => {
        setSearchQuery(e.target.value);
    }
    useEffect(() => {
        searchRestaurant(params.text, searchQuery, appliedFilter);
    },[params.text,appliedFilter])
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex flex-col md:!flex-row  justify-between gap-10'>
                <FilterPage />
                <div className='flex-1'>
                    {/* Search Input Feild */}
                    <div className='flex items-center gap-2 w-[95%]'>
                        <input
                            type="text"
                            value={searchQuery}
                            placeholder='Search by restaurants and cuisines'
                            onChange={handleChangeSearch}
                            className='w-full p-2 border rounded-md border-slate-300 outline-none focus-visible:ring-1'
                        />
                        <button
                            onClick={()=>searchRestaurant(params.text, searchQuery, appliedFilter)}
                            disabled={loading}
                            className="relative cursor-pointer  flex  items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-all"
                        >
                            {loading && (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            )}
                            {loading ? 'Please Wait...' : 'Search'}
                        </button>
                    </div>
                    {/* Search items display here */}
                        <div className='flex flex-col md:!flex-row  gap-3 md:items-center md:gap-2 my-3'>
                            <h1 className='font-medium text-lg'>({searchedRestaurants?.length||0}) Search results found</h1>
                            <div>
                                {appliedFilter.map((val, index) => {
                                    return (
                                        <div className='inline-flex items-center gap-2 max-w-full cursor-pointer' key={val + index} >
                                            <button
                                                className='border text-sm border-gray-300 text-orange-300 flex  items-center gap-2  m-1 px-2 py-1  rounded-full'>
                                                {val}
                                                <IoMdClose onClick={()=>setAppliedFilter(val)} className='text-lg' />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {/* Restaurant cards */}
                    <div className='grid mr-2 md:grid-cols-3 gap-4'>
                        {
                            loading ? <Loading /> : (
                                !loading && searchedRestaurants?.length === 0 ? <div>No results found</div> : (
                                    searchedRestaurants?.map((val, index) => {
                                        return (
                                            <div key={val + index}>
                                                <div className='!bg-white m-2 cursor-pointer    dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300'>
                                                    <div className='relative h-56 overflow-hidden'>
                                                        <img src={val.image} alt="" className='w-full h-full object-scale-down ' />
                                                        <span className='absolute top-2 left-2 border px-2 py-1 rounded-full border-slate-300 !bg-white dark:bg-gray-700 bg-opacity-75 text-sm font-medium'>Featured</span>
                                                    </div>
                                                    {/* Card Content */}
                                                    <div className='p-4 '>
                                                        <h1 className='text-2xl font-bold !text-gray-900 dark:text-gray-100 '>{val.restaurantName}</h1>
                                                        <div className='mt-2 gap-1 flex items-center !text-gray-600 dark:text-gray-400'>
                                                            <IoLocationOutline />
                                                            <p className='text-sm'>City:</p>
                                                            <p className='font-medium'>{val.city}</p>
                                                        </div>
                                                        <div className='mt-2 gap-1 flex items-center !text-gray-600 dark:text-gray-400'>
                                                            <CiGlobe />
                                                            <p className='text-sm'>Country:</p>
                                                            <p className='font-medium'>{val.country}</p>
                                                        </div>
                                                        {/* Cuisines */}
                                                        <div className='flex gap-2 mt-4 flex-wrap'>
                                                            {
                                                                val.cuisines.map((val, index) => {
                                                                    return <button key={val + index} className='font-medium px-2 py-1 text-center rounded-full shadow-sm bg-gray-700 text-white'> {val}</button>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='p-4 border-t dark:border-t-gray-700 !border-t-gray-100 text-white flex justify-end'>
                                                        <Link
                                                            to={`/restaurant/${val._id}`}
                                                            // onClick={handleSearchClick}
                                                            disabled={loading}
                                                            className="relative cursor-pointer  flex  items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300"
                                                        >
                                                            {loading && (
                                                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                            )}
                                                            {loading ? 'Please Wait...' : 'View Menus'}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            )
                        }
                        </div>
                    
                </div>
            </div>
        </div>
    )
}

export default SearchPage
