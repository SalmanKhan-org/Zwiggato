import React, { useRef } from 'react'
import { useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { TbCurrentLocation } from "react-icons/tb";
import { RiUserLocationLine } from "react-icons/ri";
import { useUserStore } from '../store/useUserStore';

const Profile = () => {
    const imageRef = useRef();
    const { user,updateProfile } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProfilePicture, setSelectedProfilePicture] = useState("");
    const [profileData, setProfileData] = useState({
        name:user.name || "",
        email: user.email || "",
        address: user.address ||"",
        city: user.city ||"",
        country: user.country || "",
        profilePicture: user.profilePicture || ""
    })



    //handle Change User Data
    const handleChangeUser = (e) => {
        const { name, value } = e.target;

        setProfileData({ ...profileData, [name]: value });
    }

    const handleSubmitUserData = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", profileData.name);
            formData.append("email", profileData.email);
            formData.append("address", profileData.address);
            formData.append("city", profileData.city);
            formData.append("country", profileData.country);

            // Only append file if user selected one
            if (profileData.profilePicture instanceof File) {
                formData.append("profilePicture", profileData.profilePicture);
            }

            await updateProfile(formData);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
  return (
    <form className='max-w-7xl mx-auto my-5' >
          <div className='flex flex-col w-[95%]'>
              <div className='flex  gap-4'>
                  <div className='relative  flex items-center justify-center bg-gray-300 rounded-full md:w-28 md:h-28 w-20 h-20'>
                      {user.profilePicture ? (
                          <img src={user.profilePicture||selectedProfilePicture} alt=""className='w-full h-full rounded-full ' />
                      ) : (<VscAccount className='text-5xl  text-slate-400' />)}
                      <input type="file" ref={imageRef} name='profilePicture'  onChange={(e)=>setProfileData({...profileData,profilePicture:e.target.files[0]})} className='hidden' />
                      <div onClick={()=>imageRef.current?.click()} className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/40  rounded-full cursor-pointer'>
                          <FiPlus className='text-white text-2xl'/>
                      </div>
                  </div>
                  {/* name of user */}
                  <div className='p-2 bg-white'>
                      <input
                          type="text"
                          name='name'
                          value={profileData.name}
                          onChange={handleChangeUser}
                          placeholder='Username'
                          className='w-full h-full outline-none text-xl font-bold border-none focus-visible:ring-0'
                      />
                  </div>
              </div>
              {/* User profile Details fields */}
              <div className='grid  md:grid-cols-4 text-2xl md:gap-2 gap-3 my-10'>
                  
                      {/* User Email Address */}
                      <div className='  p-3 rounded-lg flex items-center bg-slate-200 focus-within:ring-1'>
                            <span className='pr-2 text-xl text-gray-500'><MdOutlineEmail/></span>
                            <input
                                type="email"
                                id='email'
                                name="email"
                                value={profileData.email}
                                onChange={handleChangeUser}
                                placeholder='Email'
                                className='w-full h-full outline-none text-slate-600 '
                            />
                      </div>
                      {/* User Address */}
                      <div className=' p-3 rounded-lg flex items-center bg-slate-200 focus-within:ring-1'>
                          <span className='pr-2 text-xl text-gray-500'><CiLocationOn /></span>
                          <input
                              type="text"
                              name="address"
                              value={profileData.address}
                              onChange={handleChangeUser}
                              placeholder='Address'
                              className='w-full h-full outline-none text-slate-600  '
                          />
                      </div>
                      {/* City */}
                      <div className=' p-3 rounded-lg flex items-center bg-slate-200 focus-within:ring-1'>
                          <span className='pr-2 text-2xl text-gray-500'><TbCurrentLocation /></span>
                          <input
                              type="text"
                              name="city"
                              value={profileData.city}
                              onChange={handleChangeUser}
                              placeholder='City'
                              className='w-full h-full outline-none text-slate-600  '
                          />
                      </div>
                      {/* Country */}
                      <div className=' p-3 rounded-lg flex items-center bg-slate-200 focus-within:ring-1'>
                          <span className='pr-2 text-xl text-gray-500'><RiUserLocationLine/></span>
                          <input
                              type="text"
                              name="country"
                              value={profileData.country}
                              onChange={handleChangeUser}
                              placeholder='Country'
                              className='w-full h-full outline-none text-slate-600  '
                          />
                      </div>
                  </div>
          </div>
          <div className='w-full flex justify-center'>
              <button
                  onClick={handleSubmitUserData}
                  disabled={isLoading}
                  className="relative  flex  items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300"
              >
                  {isLoading && (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {isLoading ? 'Please Wait...' : 'Update'}
              </button>
          </div>
    </form>
  )
}

export default Profile
