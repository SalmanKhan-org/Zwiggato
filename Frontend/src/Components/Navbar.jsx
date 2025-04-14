import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";
import Menu from './Menu';
import { useUserStore } from '../store/useUserStore';
import { useCartStore } from '../store/useCartStore';


const Navbar = () => {
    const [showDashMenu, setShowDashMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { loading, logout, user } = useUserStore();
    const { cart } = useCartStore();

    const handleShowDashMenu = () => {
        setShowDashMenu((prev) => !prev);
    }

    const handleShowMenu = () => {
        setShowMenu(true);
    }

    const handleLogout = async() => {
        await logout();
    }
  return (
      <div className='w-full max-w-7xl mx-auto  '> 
          <div className='flex items-center px-2 justify-between h-14  '>
              <Link to={"/"}>
                  <h1 className='font-bold md:font-extrabold text-2xl'>Zwiggato </h1>
              </Link>
              <div className=' md:!flex items-center gap-10 hidden'>
                  <div className='flex items-center gap-6'>
                      <Link to={"/"}>Home</Link>
                      <Link to="/profile">Profile</Link>
                      <Link to={"/order/status"}>Orders</Link>
                  </div>
                  {user.admin && (
                      <div>
                          <button className='relative border border-gray-200 px-2 py-1 font-semibold shadow-lg cursor-pointer' onClick={handleShowDashMenu}>Dashboard</button>
                          {showDashMenu && (
                              <div onClick={handleShowDashMenu} className='w-full max-w-xs flex flex-col gap-2 p-2 shadow-lg  absolute top-14 bg-white border border-gray-200'>
                                  <Link className='' to={"/admin/restaurants"}>Restaurant</Link>
                                  <Link to={"/admin/menu"}>Menu</Link>
                                  <Link to={"/admin/orders"}>Orders</Link>
                              </div>
                            )}
                      </div>
                  )}
              </div>
              <div className='flex items-center gap-4'>
                  <Link to="/viewcart" className='relative cursor-pointer'>
                      <FiShoppingCart className='text-xl' />
                      <p className='absolute bg-red-500 px-2 text-white text-center rounded-full right-1 -top-5'>{ cart?.length}</p>
                  </Link>

                  <Link to={"/profile"} className='hidden md:!flex border border-slate-200 h-14 w-14  rounded-full shadow-lg'>
                      {user?.profilePicture ? (
                          <img src={user.profilePicture} alt="" className='w-full h-full rounded-full' />
                      ):(<CgProfile className='text-3xl h-full w-full text-slate-500' />)}
                  </Link>

                  {
                      user ? (
                          <Link
                              onClick={handleLogout}
                              disabled={loading}
                              className="relative hidden md:!flex items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-all"
                          >
                              {loading && (
                                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              )}
                              {loading ? "Please Wait..." : "Logout"}
                          </Link>
                      ) : (
                              <Link
                                  to={"/login"}
                                  disabled={loading}
                                  className="relative hidden md:!flex items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-all"
                              >
                                  {loading && (
                                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                  )}
                                  {loading ? "Please Wait..." : "Login"}
                              </Link>
                      )
                  }
                  <div>
                      <button onClick={handleShowMenu} className='cursor-pointer  border p-2 rounded-md shadow-lg  border-slate-200'><CiMenuBurger className='text-xl' /></button>
                          
                      {showMenu && (
                          <Menu user={user}  onClose={()=>setShowMenu(false)}/>
                      )}
                  </div>
              </div>
      </div>
    </div>
  )
}

export default Navbar
