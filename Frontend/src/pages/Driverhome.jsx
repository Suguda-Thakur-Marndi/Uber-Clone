import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import React, { useRef, useState, useEffect } from 'react'
import Ridepopup from '../componenets/Raidepopup'
import Conformridepanel from '../componenets/Conformridepanel'
import Captaintaindetails from '../componenets/Driverdetails'

const WaitingForDriver = () => {
  const driverPanelCloseRef = useRef(null)
  const [driverPanel, setDriverPanel] = useState(false)
  const ConformridepanelRef = useRef(null)
  const [showConformridepanel, setConformridepanel] = useState(false)


  useEffect(() => {
   
    if (!driverPanelCloseRef.current) return
    if (driverPanel) {
      gsap.to(driverPanelCloseRef.current, { transform: 'translateY(0)', duration: 0.5 })
    } else {
      gsap.to(driverPanelCloseRef.current, { transform: 'translateY(80%)', duration: 0.5 })
    }
  }, [driverPanel])
    useEffect(() => {
   
    if (!ConformridepanelRef.current) return
    if (showConformridepanel) {
      gsap.to(ConformridepanelRef.current, { transform: 'translateY(0)', duration: 0.5 })
    } else {
      gsap.to(ConformridepanelRef.current, { transform: 'translateY(80%)', duration: 0.5 })
    }
  }, [showConformridepanel])

  return (
    <div
      className="relative h-screen w-full flex flex-col justify-end p-5 bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
      style={{ backgroundImage: "url('https://i.sstatic.net/gtiI7.gif')" }}
    >
      <div className="fixed bottom-0 left-0 right-0 z-10  shadow-sm">
        <Captaintaindetails driverPanelCloseRef={driverPanelCloseRef} driverPanel={driverPanel} setDriverPanel={setDriverPanel} />
        <div>
        <Ridepopup setConformridepanel={setConformridepanel} />
        </div>
        <div ref={ConformridepanelRef} style={{ transform: 'translateY(80%)' }}>
        {showConformridepanel && <Conformridepanel setConformridepanel={setConformridepanel} />}
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver