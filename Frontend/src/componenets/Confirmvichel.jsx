import React from 'react'

const Confirmvichel = (props) => {
  return (
    <div className="p-5 space-y-4">
        <button 
          type="button"
          onClick={()=>{
            props.setConfirmVichelpanel?.(false)
          }}
          className="text-gray-600 hover:text-gray-900 transition mb-2"
          aria-label="Close"
        >
         <i className="ri-arrow-down-line text-xl" aria-hidden="true"></i>
        </button>
        
        <h3 className="text-2xl font-bold text-gray-900">Confirm your Ride</h3>
        
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-4 bg-white rounded-lg p-3 border-2 border-gray-200 hover:border-black transition">
            <img className="h-24 w-24 object-cover rounded" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="Uber Go vehicle" /> 
            <div className="flex-1">
              <h4 className="font-bold text-lg">Uber Go</h4>
              <p className="text-gray-600 text-sm">Affordable, Compact rides</p>
              <p className="text-lg font-bold mt-2">₹192</p>
            </div>
          </div>
        </div>
        
        <button 
          type="button"
          className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition active:scale-95"
        >
          Confirm Ride
        </button>
    </div>
  )
}

export default Confirmvichel