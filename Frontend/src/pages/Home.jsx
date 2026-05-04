import { useState, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'
import Locationpanel from "../componenets/Locationpanel"
import Vichelpanel from "../componenets/Vichelpanel"
import Confirmvichel from "../componenets/Confirmvichel"
const Home = () => {
  const [panel, setPanel] = useState(false)
  const panelRef = useRef(null)
  const panelclose = useRef(null)
  const vichelpanelref = useRef(null)
  const conformridepanel = useRef(null)
  const [vichelpanel, setvichelpanel] = useState(false)
  const [confirmRideOpen, setConfirmRideOpen] = useState(false)
  
  
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
        
        <div className="h-[20%] pb-6 px-6  w-full    bg-white">
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
          <Locationpanel vichelpanel={vichelpanel} setvichelpanel={setvichelpanel} setPanel={setPanel}/>
       

        </div>
      </div>
      <div>
      <Vichelpanel setvichelpanel={setvichelpanel} vichelpanelref={vichelpanelref} prop={{ conformrideref: setConfirmRideOpen }}/>
      </div>
      <div ref={conformridepanel} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 pt-14">
<Confirmvichel/>
      </div>
      
    </div>
    
    

    
  )
}
  

export default Home
