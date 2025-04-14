import './App.css'
import React, { useEffect } from 'react';
import Login from './auth/Login';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Signup from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import VerifyEmail from './auth/VerifyEmail';
import HereSection from './Components/HereSection';
import Profile from './Components/Profile';
import SearchPage from './Components/SearchPage';
import RestaurantDetails from './Components/RestaurantDetails';
import Cart from './Components/Cart';
import Restaurants from './admin/Restaurants';
import AddMenus from './admin/AddMenus';
import Orders from './admin/Orders';
import Success from './Components/Success';
import {  ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from './store/useUserStore';

const ProtectedRoutes = ({ children }) => {
  const { isAuth, user } = useUserStore();
  if (!isAuth) {
    return <Navigate to={"/login"} replace/>
  }

  if (!user?.isVerified) {
    return <Navigate to={"/verify-email"} replace />
  }
  return children;
}

const AuthenticatedUser = ({ children }) => {
  const { isAuth, user } = useUserStore();
  if (isAuth && user?.isVerified) {
    return <Navigate to={"/"} replace />
  }
  return children;
}

const AdminRoutes = ({ children }) => {
  const { isAuth, user } = useUserStore();
  if (!isAuth ) {
    return <Navigate to={"/login"} replace />
  }
  if (!user.admin) {
    return <Navigate to={"/"} replace />
  }
  return children;
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      { index: true, element: <HereSection /> },
      { path: "profile", element: <Profile /> },
      { path: "search/:text", element: <SearchPage /> },
      { path: "restaurant/:id", element: <RestaurantDetails /> },
      { path: "viewcart", element: <Cart /> },
      { path: "order/status", element:<Success /> },
      // Admin Services
      { path: "admin/restaurants", element: <AdminRoutes><Restaurants /></AdminRoutes>  },
      { path: "admin/menu", element: <AdminRoutes><AddMenus /></AdminRoutes>  },
      { path: "admin/orders", element: <AdminRoutes><Orders /></AdminRoutes>  },
    ]
  },
  {
    path: "/login",
    element: <AuthenticatedUser><Login /></AuthenticatedUser>
  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser>
  },
  {
    path: "/forgot-password",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/verify-email",
    element: <AuthenticatedUser><VerifyEmail /></AuthenticatedUser>
  }

])

function App() {
  return (

    <div>
      <ToastContainer />
      <RouterProvider router={appRouter} />
      
    </div>
  )
}

export default App
