import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'


const CaptainRide = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true)

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
            <div className="rounded-xl bg-black/50 px-4 py-2 shadow-lg backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wide text-amber-300">Trip Status</p>
              <h4 className="text-lg font-semibold">On the way</h4>
            </div>
            <div className="rounded-xl bg-emerald-500/90 px-4 py-2 text-sm font-semibold shadow-lg">
              Live
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl border-t border-gray-200 bg-white text-gray-900 shadow-2xl">
        <div className="mx-auto w-full max-w-3xl px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="h-1.5 w-12 rounded-full bg-gray-300" />
            <button
              type="button"
              onClick={() => setIsPanelOpen((prev) => !prev)}
              className="rounded-full p-2 text-xl text-gray-700 transition hover:bg-gray-100"
              aria-label={isPanelOpen ? 'Close panel' : 'Open panel'}
            >
              <i className={isPanelOpen ? 'ri-arrow-down-s-line' : 'ri-arrow-up-s-line'} />
            </button>
          </div>

          {isPanelOpen && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Distance</p>
                  <h4 className="text-lg font-bold">4 KM away</h4>
                </div>
                <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700">
                  Navigate
                </button>
              </div>
              <h4 className="pt-3 text-center text-base font-semibold">Driver Ride Page</h4>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CaptainRide