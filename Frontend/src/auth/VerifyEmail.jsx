import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

const VerifyEmail = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const { loading,  verifyEmail } = useUserStore();

    //handle enter value and increment cursor to next box automatically
    const handleChange = (idx, value) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[idx] = value;
            setOtp(newOtp);

            //Move to the next input
            if (value !== "" && idx < 5) {
                inputRef.current[idx + 1].focus();
            }
        }
    }

    //Backward Movement and remove value
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
        setOtp((prevOtp) => {
            const newOtp = [...prevOtp];
            newOtp[index - 1] = ""; // Clear the previous input value
            return newOtp;
        });

        setTimeout(() => {
            inputRef.current[index - 1].focus();
        }, 0);
    }
};

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        let verificationCode = otp.join("");
        await  verifyEmail(verificationCode);
    }

  return (
      <div className='flex items-center justify-center h-screen w-full'>
          <div className='p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200'>
              <div className='text-center'>
                  <h1 className='font-extrabold text-2xl '>Verify Your Email</h1>
                  <p className='text-sm text-gray-600'>Enter the 6 digit code sent to your Email</p>
              </div>
              <form >
                  <div className='flex justify-center gap-2 mb-2'>
                      {
                          otp.map((letter, index) => {
                              return <input
                                  key={letter + index}
                                  type="text"
                                  ref={(element)=>(inputRef.current[index] = element)}
                                  maxLength={1}
                                  value={letter}
                                  onChange={(e) => handleChange(index, e.target.value)}
                                  onKeyDown={(e)=>handleKeyDown(e,index)}
                                  className='border outline-none w-8 h-8 md:w-12 md:h-12 rounded text-center focus-within:ring-1'
                              />
                          })
                      }
                  </div>
                  <div className='flex items-center justify-center'>
                      <button
                          onClick={handleVerifyEmail}
                          disabled={loading}
                          className="relative cursor-pointer  flex  items-center justify-center gap-2 px-6 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 disabled:bg-orange-300 transition-colors duration-300"
                      >
                          {loading && (
                              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          )}
                          {loading ? 'Please Wait...' : 'Verify Email'}
                      </button>
                  </div>
              </form>
          </div>
    </div>
  )
}

export default VerifyEmail
