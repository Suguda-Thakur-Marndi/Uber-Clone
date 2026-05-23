import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import React, { useRef, useState, useEffect } from 'react'
import Ridepopup from '../componenets/Raidepopup'
import Captaintaindetails from '../componenets/Driverdetails'

const WaitingForDriver = () => {
  const driverPanelCloseRef = useRef(null)
  const [driverPanel, setDriverPanel] = useState(false)
   const [ridepopupPanel, setRidepopupPanel] = useState(false)
    const ridepopupCloseRef = useRef(null)

    useEffect(() => {
      if(ridepopupPanel){
        gsap.to(ridepopupCloseRef.current, { transform: 'translateY(0)', duration: 0.5 })
      }else{
        gsap.to(ridepopupCloseRef.current, { transform: 'translateY(100%)', duration: 0.5 })
      }
    }, [ridepopupPanel])


  useEffect(() => {
   
    if (!driverPanelCloseRef.current) return
    if (driverPanel) {
      gsap.to(driverPanelCloseRef.current, { transform: 'translateY(0)', duration: 0.5 })
    } else {
      gsap.to(driverPanelCloseRef.current, { transform: 'translateY(90%)', duration: 0.5 })
    }
  }, [driverPanel])

  return (
    <div
      className="relative h-screen w-full flex flex-col justify-end p-5 bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
      style={{ backgroundImage: "url('https://i.sstatic.net/gtiI7.gif')" }}
    >
      <div className="fixed bottom-0 left-0 right-0 z-10  shadow-sm">
        <Captaintaindetails driverPanelCloseRef={driverPanelCloseRef} driverPanel={driverPanel} setDriverPanel={setDriverPanel} />
        <Ridepopup setRidePopupPanel={setRidepopupPanel} ridepopupPanel={ridepopupPanel} ridepopupCloseRef={ridepopupCloseRef} />
      </div>
    </div>
  )
}

export default WaitingForDriver