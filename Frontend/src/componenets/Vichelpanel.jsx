import React from 'react'

const Vichelpanel = ({ setvichelpanel, vichelpanelref ,prop }) => {

  return (
    <div>
        <div ref={vichelpanelref} className="absolute bottom-0 left-0 right-0 translate-y-full bg-white rounded-t-3xl shadow-lg max-h-[70vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 rounded-t-3xl">
          <button
            type="button"
            onClick={()=>{
              setvichelpanel(false)
            }}
            className="text-gray-600 hover:text-gray-900 transition"
            aria-label="Close vehicle panel"
          >
            <i className="ri-arrow-down-line text-xl" aria-hidden="true"></i>
          </button>
          <h3 className="text-2xl font-bold mt-3 text-gray-900">Choose Vehicle</h3>
        </div>

        <div className="p-4 space-y-3">
          <div 
            onClick={()=>{
              prop?.conformrideref(true)
            }}
            className="bg-white border-2 border-gray-200 hover:border-black hover:shadow-lg active:border-black active:bg-gray-50 cursor-pointer flex items-center rounded-xl justify-between p-4 gap-4 transition-all"
          >
            <img className="h-20 w-20 object-cover rounded" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="Uber Go vehicle" />
            <div className="flex-1">
              <h4 className="font-bold text-base">Uber Go <span className="text-gray-600"><i className="ri-user-3-line"></i></span> 2</h4>
              <p className="text-sm text-gray-600">Affordable, Compact rides</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">2 mins</p>
              <h5 className="font-bold text-lg">₹192</h5>
            </div>
          </div>

          <div 
            onClick={()=>{
              prop?.conformrideref(true)
            }} 
            className="bg-white border-2 border-gray-200 hover:border-black hover:shadow-lg active:border-black active:bg-gray-50 cursor-pointer flex items-center rounded-xl justify-between p-4 gap-4 transition-all"
          >
            <img className="h-20 w-20 object-cover rounded" src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="Uber Auto vehicle" />
            <div className="flex-1">
              <h4 className="font-bold text-base">Uber Auto <span className="text-gray-600"><i className="ri-user-3-line"></i></span> 3</h4>
              <p className="text-sm text-gray-600">Budget-friendly, spacious rides</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">3 mins</p>
              <h5 className="font-bold text-lg">₹95</h5>
            </div>
          </div>

          <div 
            onClick={()=>{
              prop?.conformrideref(true)
            }} 
            className="bg-white border-2 border-gray-200 hover:border-black hover:shadow-lg active:border-black active:bg-gray-50 cursor-pointer flex items-center rounded-xl justify-between p-4 gap-4 transition-all"
          >
            <img className="h-20 w-20 object-cover rounded" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" alt="Uber Bike vehicle" />
            <div className="flex-1">
              <h4 className="font-bold text-base">Uber Bike <span className="text-gray-600"><i className="ri-user-3-line"></i></span> 1</h4>
              <p className="text-sm text-gray-600">Quick, economical rides</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">1 min</p>
              <h5 className="font-bold text-lg">₹45</h5>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}
export default Vichelpanel
