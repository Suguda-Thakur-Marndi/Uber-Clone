import React from 'react'

const Captaintaindetails = ({ driverPanelCloseRef, driverPanel, setDriverPanel }) => {
  return (
   <div ref={driverPanelCloseRef} className="w-full bg-white max-w-md mx-auto rounded-xl shadow-md p-4">
        <div   onClick={()=>{
          setDriverPanel(!driverPanel)
        }} className='flex justify-center w-full'>
          <i className="ri-arrow-down-s-line text-4xl"></i>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center justify-start gap-3">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"
              alt="Driver"
            />
            <div className="text-gray-900 font-medium">Name</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Total income today</div>
            <div className="text-gray-900 font-semibold">$0.00</div>
          </div>
        </div>
     <div className='bg-amber-300 h-auto rounded-2xl p-4 mt-4'>
       <div className='text-2xl font-bold text-gray-900 mb-4'>
         {new Date().toLocaleTimeString()}
       </div>
       <div className='grid grid-cols-2 gap-4'>
         <div className='bg-white rounded-lg p-3'>
           <div className='text-xs text-gray-500 mb-1'>Total Online Hours</div>
           <div className='text-lg font-semibold text-gray-900'>8.5 hrs</div>
         </div>
         <div className='bg-white rounded-lg p-3'>
           <div className='text-xs text-gray-500 mb-1'>Total Distance</div>
           <div className='text-lg font-semibold text-gray-900'>45.2 km</div>
         </div>
       </div>
     </div>
      </div>
  )
}

export default Captaintaindetails