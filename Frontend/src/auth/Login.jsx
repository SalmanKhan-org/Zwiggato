import React, { useState } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { userLoginSchema } from '../Schema/userSchema';
import { useUserStore } from '../store/useUserStore';
import { toast } from 'react-toastify';

const Login = () => {
    //state for storing user data
    const [input, setInput] = useState({
        email: "",
        password:""
    })
    const [errors, setErrors] = useState("");
    const { login, loading } = useUserStore();
    const navigate = useNavigate();

    //handle the input state changes
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    //handle Login User
    const handleLoginUser =async (e) => {
        e.preventDefault();
        //validate user form
        const result = userLoginSchema.safeParse(input);
        if (!result.success) {
            setErrors(result.error.format())
        } else {
            try {
                await login(input);
                navigate("/");
            } catch (error) {
                toast.error(error.message);
            }
        }
    }


  return (
    <div className='flex items-center justify-center h-screen w-screen'>
          <form className='md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4'>
              <div className='flex items-center justify-center mb-4'>
                  <h1 className='text-2xl font-bold'>Zwiggato</h1>
              </div>
              <div className=' mb-2'>
                  <div className='border bg-white p-2 rounded-lg flex items-center focus-within:ring-1'>
                      <span className='pr-2 text-2xl text-gray-500'><MdOutlineEmail/></span>
                      <input
                          type="email"
                          name="email"
                          value={input.email}
                          onChange={handleInputChange}
                          placeholder='Email'
                          className='w-full h-full outline-none text-slate-600  '
                      />
                  </div>
                  {
                      errors.email?._errors && <p className='text-xs m-0 text-red-500'>{errors.email?._errors}</p>
                 }
              </div>
              <div className='mb-2'>
                  <div className='border p-2 rounded-lg flex items-center focus-within:ring-1'>
                      <span className='pr-2 text-2xl text-gray-500'><TbLockPassword/></span>
                      <input
                          id='password'
                          type="password"
                          name='password'
                          value={input.password}
                          onChange={handleInputChange}
                          placeholder='Password'
                          className='w-full h-full outline-none  text-slate-600 '
                      />
                  </div>
                  {
                      errors.password?._errors && <p className='text-xs m-0 text-red-500'>{errors.password?._errors}</p>
                  }
              </div>
              <div className='flex items-center justify-center'>
                  <button
                      onClick={handleLoginUser}
                      disabled={loading}
                      className="relative cursor-pointer  flex  items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300"
                  >
                      {loading && (
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      )}
                      {loading ? 'Please Wait...' : 'Login'}
                  </button>
              </div>
              <div className='flex items-center justify-center mt-4'>
                  <Link to={"/forgot-password"} className='text-blue-400'>Forgot Password?</Link>
              </div>
              <div className='flex flex-col-reverse items-center mt-8 p-4  border-t-2 border-t-slate-300'>
                  <p className='font-semibold'>Don&apos;t have an Account ? <Link to={"/signup"} className='text-blue-400'>Signup</Link></p>
              </div>
      </form>
    </div>
  )
}

export default Login
