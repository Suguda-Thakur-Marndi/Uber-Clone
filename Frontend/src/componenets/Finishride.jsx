import React from 'react';
import { Phone, MapPin, Clock, DollarSign, CheckCircle2 } from 'lucide-react';

const FinishRide = ({ ride, onCompleteRide, isCompleting }) => {
  const user = ride?.user || {};
  const userName = user.fullname ? `${user.fullname.firstname} ${user.fullname.lastname || ''}`.trim() : 'Customer';
  const fare = ride?.fare || 160;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto rounded-3xl border border-gray-100 bg-white p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600">Arrived at Destination</span>
            <h2 className="text-xl font-bold text-gray-900 mt-0.5">Trip Summary</h2>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Completed
          </span>
        </div>

        {/* Customer Card */}
        <div className="flex items-center gap-3.5 bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop"
            alt="Customer"
            className="h-12 w-12 rounded-full object-cover border"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-gray-900 truncate">{userName}</h3>
            <p className="text-xs text-gray-500">Regular Customer • Cash or UPI</p>
          </div>
          <a
            href="tel:+919876543210"
            className="h-9 w-9 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>

        {/* Trip Stats */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 text-sm">
          <div className="grid grid-cols-2 divide-x divide-gray-200 p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-semibold">Duration</p>
                <p className="font-bold text-gray-800">{ride?.duration ? `${Math.round(ride.duration / 60)} mins` : '18 mins'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pl-3">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-semibold">Distance</p>
                <p className="font-bold text-gray-800">{ride?.distance ? `${(ride.distance / 1000).toFixed(1)} km` : '5.4 km'}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-3 space-y-2">
            <div className="flex items-start gap-2 text-xs">
              <MapPin className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-gray-700 truncate font-medium">{ride?.pickup || 'Pickup location'}</p>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <MapPin className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
              <p className="text-gray-700 truncate font-medium">{ride?.destination || 'Dropoff location'}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-linear-to-r from-emerald-50 to-teal-50 p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Total Collected Fare</p>
              <p className="text-xs text-emerald-600">Collect via Cash or QR</p>
            </div>
            <p className="text-2xl font-extrabold text-emerald-800">₹{fare}</p>
          </div>
        </div>

        <button
          type="button"
          disabled={isCompleting}
          onClick={onCompleteRide}
          className="w-full rounded-2xl bg-black hover:bg-gray-800 active:scale-[0.99] px-4 py-3.5 text-sm font-bold text-white shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isCompleting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Finalizing...</span>
            </>
          ) : (
            <>
              <span>Complete Ride & Receive ₹{fare}</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FinishRide;