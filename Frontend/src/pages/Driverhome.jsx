import React from 'react'

const WaitingForDriver = (props) => {
  return (
   <div 
     className="relative min-h-screen w-full flex flex-col justify-end p-5 bg-cover bg-center bg-no-repeat bg-fixed"
     style={{
       backgroundImage: 'url(https://i.sstatic.net/gtiI7.gif)'
     }}
   >
     <div className="w-full max-w-md mx-auto space-y-4">
        <img
          className="absolute right-3 top-3 h-16 w-24 p-4 opacity-10 pointer-events-none select-none"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
          aria-hidden="true"
        />

        <button 
          type="button"
          onClick={()=>{
            props.onClose?.()
          }}
          className="text-gray-600 hover:text-gray-900 transition mb-2"
          aria-label="Close"
        >
         <i className="ri-arrow-down-line text-xl" aria-hidden="true"></i>
        </button>

        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-4 bg-white rounded-lg p-3 border-2 border-gray-200 hover:border-black transition">
           
            <div className="w-24 shrink-0">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF6gyQIHww9J6JiEsHZYk5AIbvPf7CvDUl1A&s"
                alt="Driver"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="mt-2 space-y-2">
                <button className="w-full text-xs bg-gray-100 rounded-md py-1">Safety</button>
                <button className="w-full text-xs bg-gray-100 rounded-md py-1">Share my trip</button>
              </div>
            </div>
                
            <div className="flex-1">
              <h4 className="font-bold text-lg">{props.driverName || 'Driver Name'}</h4>
              <p className="text-gray-600 text-sm">{props.vehicleInfo || 'Uber Go • Affordable, Compact rides'}</p>
              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium">{props.driverNumber || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Vehicle</span>
                  <span className="font-medium">{props.driverPlate || props.vehiclePlate || 'Plate N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-3">
          <div className="flex items-start gap-3">
            <i className="ri-map-pin-user-fill text-lg text-gray-700 mt-1" aria-hidden="true"></i>
            <div>
              <p className="text-xs text-gray-500">Current Location</p>
              <p className="text-sm font-medium text-gray-900">{props.currentLocation || props.pickup || 'Location not set'}</p>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          <div className="flex items-start gap-3">
            <i className="ri-map-pin-2-fill text-lg text-gray-700 mt-1" aria-hidden="true"></i>
            <div>
              <p className="text-xs text-gray-500">Destination</p>
              <p className="text-sm font-medium text-gray-900">{props.destination || 'Destination not set'}</p>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          <div className="flex items-start gap-3">
            <i className="ri-money-rupee-circle-fill text-lg text-gray-700 mt-1" aria-hidden="true"></i>
            <div>
              <p className="text-xs text-gray-500">Amount</p>
              <p className="text-sm font-medium text-gray-900">{props.fare || props.price || '₹192'}</p>
            </div>
          </div>
        </div>
        
        </div>
    </div>
  )
}

export default WaitingForDriver