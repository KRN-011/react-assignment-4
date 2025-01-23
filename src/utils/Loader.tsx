import React from 'react'

const Loader: React.FC = () => {
  return (
    <>
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur-sm'>
            <div className='bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center space-y-4'>
                <div className='w-16 h-16 border-4 border-t-blue-600 rounded-full animate-spin'></div>
                <p className='text-xl font-semibold text-gray-700'>Please wait...</p>
            </div>
        </div>
    </>
  )
}

export default Loader