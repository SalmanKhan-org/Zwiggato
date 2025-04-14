import React, { useState } from 'react'
import { TbLockPassword } from "react-icons/tb";
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }
    return (
        <div className='flex items-center justify-center min-h-screen w-full'>
            <form className='flex flex-col gap-5 p-4 md:p-8 w-full max-w-md rounded-lg'>
                <div className='text-center'>
                    <h1 className='font-extrabold text-2xl mb-2'>Reset Password</h1>
                    <p className='textt-sm text-gray-600'> Enter your new Password to reset your Password</p>
                </div>
                <div className=' mb-1'>
                    <div className='border p-2 rounded-lg flex items-center focus-within:ring-1'>
                        <span className='pr-2 text-2xl text-gray-500'><TbLockPassword /></span>
                        <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleNewPassword}
                            placeholder='New Password'
                            className='w-full h-full outline-none text-slate-600  '
                        />
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-2'>
                    <button className='w-full text-white bg-orange-400 cursor-pointer border p-2 rounded-lg '>Reset Password</button>
                    <p className='w-full text-center'>Back to <Link to={"/login"} className='text-blue-400'>Login </Link></p>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword