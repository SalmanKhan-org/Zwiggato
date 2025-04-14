import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import MenuDialog from './MenuDialog';
import EditMenu from './EditMenu';
import { useMenuStore } from '../store/useMenuStore';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { useEffect } from 'react';

const AddMenus = () => {
    const [open, setOpen] = useState(false);
    const [openEditMenu, setOpenEditMenu] = useState(false);
    const [input, setInput] = useState({
        name: "",
        description: "",
        price: 0,
        image: undefined
    });
    const [menuId, setMenuId ] = useState("");
    const updateInput = (menu) => {
        setInput({
            name: menu.name || "",
            description: menu.description || "",
            price: menu.price,
            image: undefined
        });
        setMenuId(menu._id);
    }
    const { restaurant, getRestaurant } = useRestaurantStore();
    useEffect(() => {
        getRestaurant();
    }, []);
  return (
    <div className='max-w-6xl mx-auto my-10'>
          <div className='flex justify-between'>
              <h1 className='font-bold md:font-extrabold text-lg md:text-2xl'>Available Menus</h1>
              <button onClick={()=>setOpen(true)} className='flex items-center  gap-2 px-2 py-1 rounded-md bg-orange-400 text-white hover:bg-orange-500 transition-colors duration-300 cursor-pointer'> <FaPlus/> Add Menus</button>
          </div>
          <div className='mt-6 flex gap-2 flex-wrap  '> 
              {restaurant?.menus?.map((menu, index) => {
                  return (
                      <div key={menu+index} className='flex flex-col md:w-[30%] md:h-64 md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border border-slate-300'>
                          <img
                              src={menu.image}
                              alt=""
                              className='md:h-28 md:w-28 h-20 w-full object-cover rounded-lg'
                          />
                          <div className='flex-1'>
                              <h1 className='text-lg font-semibold text-gray-800'>
                                  {menu.name}
                              </h1>
                              <div className='text-sm text-gray-600 truncate '>{menu.description}</div>
                              <h2 className='text-md font-semibold mt-1'>
                                  price: <span className='text-orange-300'>{menu.price}</span>
                              </h2>
                          </div>
                          <button
                              onClick={() => {
                                  setOpenEditMenu(true)
                                  updateInput(menu);
                              }}
                              className='w-full bg-orange-400 hover:bg-orange-500 py-1 px-2 rounded-md mt-1 text-white cursor-pointer transition-colors duration-300'>Edit</button>
                      </div>
                  )
              })}
          </div>
          {open && <MenuDialog onClose={() => setOpen(false)} />}
          {openEditMenu && <EditMenu onClose={() => setOpenEditMenu(false)} input={input} setInput={setInput} menuId={menuId} />}
    </div>
  )
}

export default AddMenus
