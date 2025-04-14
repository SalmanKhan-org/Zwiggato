import React from 'react';
import { MdOutlineTimer } from "react-icons/md";
import AvailableMenu from './AvailableMenu';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const RestaurantDetails = () => {
    const params = useParams();
    const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();
    useEffect(() => {
        async function fetchData() {
            if (params.id) {
                await getSingleRestaurant(params.id);
            }
        }
        fetchData();
    }, [params.id]);
    return (
        <div className='max-w-6xl mx-auto my-10'>
            <div className='w-full'>
                <div className='relative w-full h-36 md:h-64  lg:h-72'>
                    <img
                        src={singleRestaurant?.image || "...Loading"}
                        alt="res_image"
                        className='object-cover mix-blend-multiply w-full h-full rounded-lg hover:shadow-lg transition-shadow duration-300'
                    />
                </div>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className='my-5'>
                        <h1 className='font-medium text-xl'>{singleRestaurant?.restaurantName || "NA"}</h1>
                        <div className='flex gap-2 my-2'>
                            {singleRestaurant?.cuisines?.map((value, index) => (
                                <button key={value + index} className='px-2  rounded-full bg-black text-white'>{value}</button>
                            ))}
                        </div>
                        <div className='flex md:flex-row flex-col gap-2 my-5'>
                            <div className='flex items-center gap-2'>
                                <MdOutlineTimer className='text-xl' />
                                <h1 className='font-medium'>Delivery Time : <span className='text-orange-300'>{singleRestaurant?.deliveryTime||"NA"} mins</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <AvailableMenu menus={singleRestaurant?.menus}/>
            </div>
        </div>
    )
}

export default RestaurantDetails
