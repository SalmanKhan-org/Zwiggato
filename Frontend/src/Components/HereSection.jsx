import React, { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import HereImage from '../assets/hero_pizza.png'
import { useNavigate } from 'react-router-dom';

const HereSection = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleSearchClick = () => {
        navigate(`/search/${searchText}`)
    }
  return (
    <div className='flex flex-col md:!flex-row max-w-7xl mx-auto  md:p-10 rounded-lg items-center justify-center m-4 gap-20'>
          <div className='flex flex-col gap-10 md:w-[40%] '>
              
              <div className='flex flex-col gap-5'>
                  <h1 className='font-bold md:font-extrabold md:text-5xl text-4xl'>Order Food Anytime and Anywhere</h1>
                  <p className='text-gray-500 '>Hey! Our Delicious Food is waiting for you, We are always near to you</p>
              </div>
              <div className='flex w-[95%] items-center  gap-2'>
                  <div className='relative flex-1   p-2 border rounded-lg focus-within:ring-2'>
                      <input
                          type="text"
                          value={searchText}
                          onChange={handleSearchChange}
                          className='w-full h-full outline-none'
                          placeholder='Search Food By Name'
                      />
                      <span className='absolute text-slate-500 right-2 text-2xl'><FiSearch /></span>
                  </div>
                  <button
                      onClick={handleSearchClick}
                      disabled={loading}
                      className="relative cursor-pointer  flex  items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-all"
                  >
                      {loading && (
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      )}
                      {loading ? 'Please Wait...' : 'Search'}
                  </button>
              </div>
          </div>
          <div>
              <img
                  src={HereImage}
                  className='object-cover w-full max-h-[500px] max-w-[90%]'
                  alt="Cover Image" />
          </div>
    </div>
  )
}

export default HereSection
