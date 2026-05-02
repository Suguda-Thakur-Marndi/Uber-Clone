import { useState, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'
import Locationpanel from "../componenets/Locationpanel"
const Home = () => {
  const [panel, setPanel] = useState(false)
  const panelRef = useRef(null)
  const panelclose = useRef(null)
  
  
  useGSAP(() => {
    if(panel){
      gsap.to(panelRef.current, { height:'80%' })
      gsap.to(panelclose.current, {
        opacity:1
      })
    } else {
      gsap.to(panelRef.current, { height:'0%' })
      gsap.to(panelclose.current, {
        opacity:0
      })
    }
  }, [panel])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPanel(!panel)
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-10  shadow-sm">
        <img className="h-16 w-24 p-4" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" />
      </div>
      <img className="w-full h-full object-cover" src="https://i.sstatic.net/gtiI7.gif" alt="" role="presentation" /> 
      <div className="flex flex-col justify-end absolute top-16 h-[calc(100vh-4rem)] w-full px-0 rounded-t-3xl shadow-lg">
        
        <div className="h-[20%] p-5  w-full    bg-white">
          <button
            type="button"
            ref={panelclose}
            onClick={()=>
              setPanel(false)
            }
            aria-label="Close panel"
          >
          <i className="ri-arrow-down-line" aria-hidden="true"></i>
          </button>
          <h4 className="text-3xl font-bold mb-6 text-gray-900">
            Find Trip
          </h4>
          <form className="space-y-4 relative" onSubmit={handleSubmit}>
            <div className="absolute left-7 py-3.5 top-0 h-full rounded-full w-1 flex-col bg-black"></div>
            <input 
              onClick={()=>{
                setPanel(true)
              }}
              className="bg-gray-100 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition pl-12" 
              type="text" 
              placeholder="📍 Add Pickup location"
            />
            <input
              onClick={()=>{
                setPanel(true)
              }} 
              className="bg-gray-100 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition pl-12" 
              type="text" 
              placeholder="🎯 Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-[80%] p-5 w-full">
          <Locationpanel/>
       

        </div>
      </div>
    
      <div className="absolute bottom-0 left-0 right-0 bottom-0 translate-y-full bg-white p-3 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Choose Vehicle</h3>
   
        <div className="border-2 active:border-black border-gray-200 flex items-center rounded-2xl justify-between p-.5 gap-4">
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

        <div className="border-2  active:border-black border-gray-300 flex items-center rounded-2xl justify-between p-.5 gap-4 mt-3">
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

        <div className="border-2  active:border-black border-gray-300 flex items-center rounded-2xl justify-between p-.5 gap-4 mt-3">
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
  

export default Home
