import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-bg-lightgreen to-emerald-600 flex justify-center items-center'>
      <div className='animate-spin w-16 h-16 text-white'></div>
    </div>
  )
}

export default Loading
