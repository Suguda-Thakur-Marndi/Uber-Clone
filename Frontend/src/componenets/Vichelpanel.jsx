import React from 'react'

const Vichelpanel = ({ setvichelpanel, vichelpanelref ,prop }) => {

  return (
    <div>
        <div ref={vichelpanelref} className="absolute bottom-0 left-0 right-0 translate-y-full bg-white p-3 shadow-lg">
        <button
          type="button"
          onClick={()=>{
            setvichelpanel(false)
          }}
          aria-label="Close vehicle panel"
        >
          <i className="ri-arrow-down-line" aria-hidden="true"></i>
        </button>
        <h3 className="text-2xl font-bold mb-4">Choose Vehicle</h3>
   
        <div onClick={()=>{
            prop?.conformrideref(true)

        }}className="border-2 active:border-black border-gray-200 flex items-center rounded-2xl justify-between p-0.5 gap-4">
            <img className="h-20 mb-4" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="Uber Go vehicle" />
          <div>
            <h4 className=" text-sm">Uber Go <span><i className="ri-user-3-line"></i></span> 2</h4>
            <p className="text-sm text-gray-600">Affordable, Compact rides</p>
          </div>
          <div className="flex items-center gap-2">
            <h5 className="text-sm">2 mins away</h5>
          </div>
          <div className="font-bold p-2 text-lg">₹192</div>
        </div>

        <div onClick={()=>{
             prop?.conformrideref(true)
            
        }} className="border-2  active:border-black border-gray-300 flex items-center rounded-2xl justify-between p-0.5 gap-4 mt-3">
            <img className="h-20 mb-4" src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="Uber Auto vehicle" />
          <div>
            <h4 className=" text-sm">Uber Auto <span><i className="ri-user-3-line"></i></span> 3</h4>
            <p className="text-sm text-gray-600">Budget-friendly, spacious rides</p>
          </div>
          <div className="flex items-center gap-2">
            <h5 className="text-sm">3 mins away</h5>
          </div>
          <div className="font-bold text-lg p-2">₹95</div>
        </div>

        <div onClick={()=>{
             prop?.conformrideref(true)
            
        }} className="border-2  active:border-black border-gray-300 flex items-center rounded-2xl justify-between p-0.5 gap-4 mt-3">
            <img className="h-20 mb-4" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" alt="Uber Bike vehicle" />
          <div>
            <h4 className=" text-sm">Uber Bike <span><i className="ri-user-3-line"></i></span> 1</h4>
            <p className="text-sm text-gray-600">Quick, economical rides</p>
          </div>
          <div className="flex items-center gap-2">
            <h5 className="text-sm">1 min away</h5>
          </div>
          <div className="font-bold text-lg p-2">₹45</div>
        </div>
        
      </div>
      </div>
  )
}
export default Vichelpanel
