import { useState, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'
const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panel, setPanel] = useState(false)
  const panelRef = useRef(null)
  
  useGSAP(() => {
    if(panel){
      gsap.to(panelRef.current, { height:'70%' })
    } else {
      gsap.to(panelRef.current, { height:'0%' })
    }
  }, [panel])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPanel(!panel)
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
        <img className="h-16 w-24 p-4" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" />
      </div>
      <img className="w-full h-full object-cover" src="https://i.sstatic.net/gtiI7.gif" alt="" role="presentation" /> 
      <div className="flex flex-col justify-end absolute top-16 h-[calc(100vh-4rem)] w-full px-0 rounded-t-3xl shadow-lg">
        <div className="h-[30%] p-5 w-full  bg-white">
          
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
              value={pickup}
              onChange={(e)=>{
                setPickup(e.target.value)
              }}
            />
            <input
              onClick={()=>{
                setPanel(true)
              }} 
              className="bg-gray-100 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition pl-12" 
              type="text" 
              placeholder="🎯 Enter your destination"
              value={destination}
              onChange={(e)=>{
                setDestination(e.target.value)
              }}
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-red-500 h-[70%] p-5 w-full">

        </div>
      </div>
    </div>
  )
}
  

export default Home
