import React, { useState, useRef } from 'react'
import Finishride from '../componenets/Finishride'
import 'remixicon/fonts/remixicon.css'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { Link } from 'react-router-dom'


const CaptainRide = () => {
  const [finishRide, setFinishRide] = useState(false)
  const finalpanelRef = useRef(null)
 

  useGSAP(() => {
    if(finishRide){
      gsap.to(finalpanelRef.current, { height:'28%', duration: 0.3, ease: 'power2.inOut' })
      
    } else {
      gsap.to(finalpanelRef.current, { height:'5%', duration: 0.3, ease: 'power2.inOut' })
      
    }
  }, [finishRide])
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <div
        className="min-h-screen"
        style={{
          backgroundImage: 'url("https://i.sstatic.net/gtiI7.gif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="min-h-screen bg-black/35 backdrop-brightness-90">
          <div className="flex items-start justify-between p-4 md:p-6">
            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-2xl backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">Trip status</p>
              <h4 className="mt-1 text-lg font-semibold leading-tight">On the way</h4>
              <p className="mt-1 text-xs text-white/70">Preparing for pickup completion</p>
            </div>
            <div className="rounded-xl bg-emerald-500/90 px-4 py-2 text-sm font-semibold shadow-lg">
              Live
            </div>
          </div>
        </div>
      </div>

      <div ref={finalpanelRef} className="fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl border-t border-gray-200 bg-white text-gray-900 shadow-2xl overflow-hidden">
        <div className="mx-auto w-full max-w-3xl px-5 py-4">
          <div onClick={() => setFinishRide(!finishRide)} className="flex items-center justify-center cursor-pointer transition-transform">
            <i className={`ri-arrow-${finishRide ? 'down' : 'up'}-s-line text-3xl`}></i>
          </div>
          {finishRide && (
            <>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Distance</p>
                  <h4 className="text-lg font-bold">4 KM away</h4>
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]">
                  <i className="ri-navigation-line text-base"></i>
                  Navigate
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold">Driver Ride</h4>
                  <p className="text-sm text-gray-500">Finish when complete</p>
                </div>
              </div>

              <Link
                to="/finishride"
                className="mt-4 w-full flex items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-500 active:scale-[0.98]"
              >
                Complete Ride                
              </Link>
            </>
          )}
        </div>
      </div>

      
    </div>
  )
}

export default CaptainRide