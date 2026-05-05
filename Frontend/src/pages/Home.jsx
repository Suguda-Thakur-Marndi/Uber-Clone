import { useState, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'
import Locationpanel from "../componenets/Locationpanel"
import Vichelpanel from "../componenets/Vichelpanel"
import Confirmvichel from "../componenets/Confirmvichel"
import WaiteforDriver from "../componenets/WaiteforDriver"
import LookingforDriver from "../componenets/LookingforDriver"
const Home = () => {
  const [panel, setPanel] = useState(false)
  const panelRef = useRef(null)
  const panelclose = useRef(null)
  const vichelpanelref = useRef(null)
  const conformridepanel = useRef(null)
  const vichelfoundpanel = useRef(null)
  const waitingfordriverref = useRef(null)
  const [waitingfordriver, setwaitingfordriver] = useState(false)
  const [vichelpanel, setvichelpanel] = useState(false)
  const [confirmRideOpen, setConfirmRideOpen] = useState(false)
  const [VichelFound, setVichelFound] = useState(false)
  
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
  useGSAP(()=>{
    if(vichelpanel){
      gsap.to(vichelpanelref.current,{
        transform:'translateY(0)'
      } )
    }
    else{
      gsap.to(vichelpanelref.current,{
       transform:'translateY(100%)'
      })
    }
  },[vichelpanel])
  useGSAP(()=>{
    if(confirmRideOpen){
      gsap.to(conformridepanel.current,{
        transform:'translateY(0)'
      } )
    }
    else{
      gsap.to(conformridepanel.current,{
       transform:'translateY(100%)'
      })
    }
  },[confirmRideOpen])
  useGSAP(()=>{
    if(VichelFound){
      gsap.to(vichelfoundpanel.current,{
        transform:'translateY(0)'
      } )
    }
    else{
      gsap.to(vichelfoundpanel.current,{
       transform:'translateY(100%)'
      })
    }
  },[VichelFound])
  useGSAP(()=>{
    if(waitingfordriver){
      gsap.to(waitingfordriverref.current,{
        transform:'translateY(0)'
      } )
    }
    else{
      gsap.to(waitingfordriverref.current,{
       transform:'translateY(100%)'
      })
    }
  },[waitingfordriver])

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
        
        <div className="h-[20%] pb-6 px-6 w-full bg-white">
          <button
            type="button"
            ref={panelclose}
            onClick={()=>
              setPanel(false)
            }
            className="text-gray-500 hover:text-gray-900 transition mb-2"
            aria-label="Close panel"
          >
          <i className="ri-arrow-down-line text-xl" aria-hidden="true"></i>
          </button>
          <h4 className="text-3xl font-bold mb-4 text-gray-900">
            Find Trip
          </h4>
          <form className="space-y-3 relative" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute left-3 top-3.5 text-green-600 text-lg flex items-center">
                <i className="ri-map-pin-2-fill"></i>
              </div>
              <input 
                onClick={()=>{
                  setPanel(true)
                }}
                className="bg-gray-100 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition pl-10 font-medium" 
                type="text" 
                placeholder="Pickup location"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-3.5 text-red-500 text-lg flex items-center">
                <i className="ri-map-pin-fill"></i>
              </div>
              <input
                onClick={()=>{
                  setPanel(true)
                }} 
                className="bg-gray-100 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition pl-10 font-medium" 
                type="text" 
                placeholder="Where to?"
              />
            </div>
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-[80%] p-5 w-full">
          <Locationpanel vichelpanel={vichelpanel} setvichelpanel={setvichelpanel} setPanel={setPanel}/>
       

        </div>
      </div>
      <div>
      <Vichelpanel setvichelpanel={setvichelpanel} vichelpanelref={vichelpanelref} prop={{ conformrideref: setConfirmRideOpen }}/>
      </div>
      <div ref={conformridepanel} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 pt-14">
        <Confirmvichel 
          onClose={() => setConfirmRideOpen(false)}
          onConfirmRide={() => {
            setConfirmRideOpen(false)
            setVichelFound(true)
          }} 
        />
      </div>
        <div ref={vichelfoundpanel} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 pt-14">
        <LookingforDriver onClose={() => setVichelFound(false)} />
      </div>
      <div ref={waitingfordriverref} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 pt-14">
        <WaiteforDriver/>
      </div>
      
      
    </div>
  )
}
  

export default Home
