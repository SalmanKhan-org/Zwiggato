import React, { useState } from 'react'
import { restaurantSchema } from '../Schema/restaurantSchema';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Restaurants = () => {
    const [errors, setErrors] = useState("");
    const [input, setInput] = useState({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        image:undefined
    })
    const { loading, createRestaurant , restaurant, updateRestaurant,getRestaurant} = useRestaurantStore();

    const handleInputChange = (e) => {
        const { name, value,type } = e.target;
        setInput((prev) => (
            {...prev,[name]: type==='number'? Number(value): value}
        ))
    }

    const handleSubmitInput = async() => {
        const result = restaurantSchema.safeParse(input);
        if (!result.success) {
            setErrors(result.error.format());
            return;
        } else {
            try {
                const formData = new FormData();
                if (input) {
                    formData.append("restaurantName", input.restaurantName || "");
                    formData.append("city", input.city || "");
                    formData.append("country", input.country || "");
                    formData.append("deliveryTime", input.deliveryTime ? input.deliveryTime.toString() : "");
                    formData.append("cuisines", input.cuisines ? JSON.stringify(input.cuisines) : "");

                    if (input.image instanceof File) {
                        formData.append("image", input.image);
                    }
                }
                if (restaurant) {
                    await updateRestaurant(formData);
                } else {
                   
                    await createRestaurant(formData);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }

    }
    
    useEffect(() => {
        const fetchRestaurant = async () => {
            await getRestaurant();
            setInput({
                restaurantName: restaurant.restaurantName || "",
                city: restaurant.city || "",
                country: restaurant.country || "",
                deliveryTime: restaurant.deliveryTime || 0,
                cuisines: restaurant.cuisines ? restaurant.cuisines.map((cuisine) => cuisine) : [],
                image: undefined
            })
        };
        fetchRestaurant();
    }, []);
  return (
    <div className='max-w-6xl mx-auto my-10'>
          <div className=''> 
              <div>
                  <h1 className='font-extrabold text-2xl mb-5'>Add Restaurants</h1>
              </div>
              <div className='md:grid md:grid-cols-2 gap-6 space-y-2 '>
                  {/* Restaurant name */}
                  <div className='mb-2 flex flex-col '>
                      <label htmlFor="name" className='font-semibold'>Restaurant Name</label>
                      <div className='border border-slate-300 bg-white p-2 rounded-lg flex items-center focus-within:ring-1'>
                          <input
                              type="text"
                              id='name'
                              name="restaurantName"
                              value={input?.restaurantName}
                              onChange={handleInputChange}
                              placeholder='Restaurant Name'
                              className='w-full h-full outline-none text-slate-600  '
                          />
                      </div>
                      {
                          errors.restaurantName?._errors && <p className='text-xs m-0 text-red-500'>{errors.restaurantName?._errors}</p>
                      }
                  </div>
                  {/* city */}
                  <div className='mb-2 flex flex-col '>
                      <label htmlFor="city" className='font-semibold'>City</label>
                      <div className='border border-slate-300 bg-white p-2 rounded-lg flex items-center focus-within:ring-1'>
                          <input
                              type="text"
                              id='city'
                              name="city"
                                value={input?.city}
                                onChange={handleInputChange}
                              placeholder='City'
                              className='w-full h-full outline-none text-slate-600  '
                          />
                      </div>
                      {
                          errors.city?._errors && <p className='text-xs m-0 text-red-500'>{errors.city?._errors}</p>
                      }
                  </div>
                  {/* Country */}
                  <div className='mb-2 flex flex-col '>
                      <label htmlFor="country" className='font-semibold'>Country</label>
                      <div className='border border-slate-300 bg-white p-2 rounded-lg flex items-center focus-within:ring-1'>
                          <input
                              type="text"
                              id='country'
                              name="country"
                                value={input?.country}
                                onChange={handleInputChange}
                              placeholder='Country'
                              className='w-full h-full outline-none text-slate-600  '
                          />
                      </div>
                      {
                          errors.country?._errors && <p className='text-xs m-0 text-red-500'>{errors.country?._errors}</p>
                      }
                  </div>
                  <div className='mb-2 flex flex-col '>
                      <label htmlFor="deliveryTime" className='font-semibold'>Delivery Time</label>
                      <div className='border border-slate-300 bg-white p-2 rounded-lg flex items-center focus-within:ring-1'>
                          <input
                              type="number"
                              id='deliveryTime'
                              name="deliveryTime"
                            value={input?.deliveryTime}
                            onChange={handleInputChange}
                              placeholder='Delivery Time'
                              className='w-full h-full outline-none text-slate-600  '
                          />
                      </div>
                      {
                          errors.deliveryTime?._errors && <p className='text-xs m-0 text-red-500'>{errors.deliveryTime?._errors}</p>
                      }
                  </div>
                  <div className='mb-2 flex flex-col '>
                      <label htmlFor="cuisines" className='font-semibold'>Cuisines</label>
                      <div className='border border-slate-300  bg-white p-2 rounded-lg flex items-center focus-within:ring-1'>
                          <input
                              type="text"
                              id="cuisines"
                              name="cuisines"
                              value={input?.cuisines}  // Convert array back to string
                              onChange={(e) =>
                                  setInput((prev) => ({
                                      ...prev,
                                      cuisines: e.target.value.split(",").map((item) => item), // Trim spaces
                                  }))
                              }
                              placeholder="e.g., Biryani, Kabab"
                              className="w-full h-full outline-none text-slate-600"
                          />

                      </div>
                      {
                          errors.cuisines?._errors && <p className='text-xs m-0 text-red-500'>{errors.cuisines?._errors}</p>
                      }
                  </div>
                  <div className='mb-2 flex flex-col '>
                      <p className='font-semibold'>Upload Restaurant Banner</p>
                      <label className='flex flex-col'>
                          <div className='border border-slate-300 w-full rounded-md p-2 '>
                              <p className='text-slate-400'> Click to an Upload Image</p>
                              <input type="file" name='image' onChange={(e) =>
                                  setInput({
                                      ...input,
                                      image: e.target.files[0] || undefined,
                                  })
                              } className='hidden' />
                          </div>
                      </label>
                      {
                          errors.image?._errors && <p className='text-xs m-0 text-red-500'>{errors.image?._errors}</p>
                      }
                  </div>
                  <div>
                      <button
                          onClick={handleSubmitInput}
                          disabled={loading}
                          className="relative cursor-pointer  flex  items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300"
                      >
                          {loading && (
                              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          )}
                          {loading ? 'Please Wait...' : 'Add Your Restaurant'}
                      </button>
                  </div>
              </div>
      </div>
    </div>
  )
}

export default Restaurants
