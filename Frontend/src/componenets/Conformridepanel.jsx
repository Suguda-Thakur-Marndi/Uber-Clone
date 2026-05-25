import React from 'react'
import { useGSAP } from "@gsap/react"
import { useRef } from 'react'
import gsap from "gsap"

const Conformridepanel = ({ setConformridepanel }) => {
  const panelRef = useRef(null)
  const panelclose = useRef(null)
  
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: '55%',
      duration: 0.5
    })

    gsap.to(panelclose.current, {
      opacity: 1,
      duration: 0.3
    })
  }, [])
  return (
    <div>
    <div
      ref={panelRef} onClick={() => setConformridepanel(false)}
      className="fixed bottom-0 z-50 w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl"
      style={{ height: "55%" }}
    >

      <div className="p-5">

        <div
          ref={panelclose}
          className="mx-auto mb-4 h-1.5 w-12 cursor-pointer rounded-full bg-gray-300"
        />

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              New ride request
            </p>

            <h3 className="mt-1 text-2xl font-bold text-gray-900">
              A new ride is available!
            </h3>

          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            2 km away
          </span>

        </div>

        <div className="mt-5 flex items-center gap-4 rounded-2xl bg-gray-50 p-4">

          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop"
            alt="Customer"
            className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-sm"
          />

          <div className="min-w-0 flex-1">

            <p className="text-sm text-gray-500">
              Customer
            </p>

            <p className="truncate text-lg font-semibold text-gray-900">
              Rahul Sharma
            </p>

          </div>

        </div>

        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

          <div className="flex items-start gap-3">

            <i className="ri-map-pin-user-fill mt-0.5 text-lg text-emerald-600"></i>

            <div>

              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Current Location
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                KIIT Square, Bhubaneswar
              </p>

            </div>

          </div>

          <div className="my-4 border-t border-dashed border-gray-200"></div>

          <div className="flex items-start gap-3">

            <i className="ri-map-pin-2-fill mt-0.5 text-lg text-red-500"></i>

            <div>

              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Destination
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                Railway Station
              </p>

            </div>

          </div>

          <div className="my-4 border-t border-dashed border-gray-200"></div>

          <div className="flex items-start gap-3">

            <i className="ri-money-rupee-circle-fill mt-0.5 text-lg text-blue-600"></i>

            <div>

              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Amount
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                ₹192
              </p>

            </div>

          </div>

        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">

          <button
            onClick={() => setConformridepanel(false)}
            type="button"
            className="w-full rounded-2xl border border-gray-300 bg-white py-3 font-semibold text-gray-700"
          >
            Ignore
          </button>

          <button
            type="button"
            className="w-full rounded-2xl bg-black py-3 font-semibold text-white"
          >
            Confirm
          </button>

        </div>

      </div>

    </div>
    </div>
  )
}

export default Conformridepanel