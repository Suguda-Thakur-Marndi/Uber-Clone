import React from 'react';

const WaiteforDriver = ({ ride, onClose }) => {
  const driver = ride?.driver || ride?.captain || {};
  const fullname = driver.fullname ? `${driver.fullname.firstname} ${driver.fullname.lastname || ''}`.trim() : 'Your Driver';
  const vehicle = driver.vehicle || {};

  return (
    <div className="p-5 max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Driver Assigned
          </span>
          <h3 className="text-xl font-bold text-gray-900 mt-1">Driver is on the way</h3>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        )}
      </div>

      {/* Driver & Vehicle Info Card */}
      <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop"
              alt="Driver profile"
              className="h-14 w-14 rounded-full object-cover border-2 border-black"
            />
            <span className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full p-0.5 text-[10px] ring-2 ring-white">
              <i className="ri-shield-check-fill"></i>
            </span>
          </div>
          <div>
            <h4 className="font-bold text-base text-gray-900">{fullname}</h4>
            <p className="text-xs text-gray-600 capitalize">
              {vehicle.colour || 'White'} {vehicle.vehicleType || 'Sedan'}
            </p>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-amber-500 font-semibold">
              <i className="ri-star-fill"></i>
              <span>4.9</span>
              <span className="text-gray-400 font-normal">• 1.2k trips</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-block bg-black text-white font-mono font-bold text-sm px-3 py-1.5 rounded-lg tracking-wider shadow-xs">
            {vehicle.vehicleNumberPlate || 'DL 01 AB 1234'}
          </span>
        </div>
      </div>

      {/* OTP Display Highlight */}
      {ride?.otp && (
        <div className="bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-4 text-center shadow-lg shadow-emerald-500/20">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100">Start Code (OTP)</p>
          <div className="text-3xl font-extrabold tracking-widest my-1 font-mono">
            {ride.otp}
          </div>
          <p className="text-[11px] text-emerald-100">Share this 6-digit PIN with your driver to begin the trip</p>
        </div>
      )}

      {/* Trip Details */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3 shadow-xs">
        <div className="flex items-start gap-3">
          <i className="ri-map-pin-user-fill text-emerald-600 text-base mt-0.5"></i>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-400 font-semibold uppercase">Pickup</p>
            <p className="text-sm font-medium text-gray-800 truncate">{ride?.pickup || 'Pickup location'}</p>
          </div>
        </div>
        <div className="border-t border-gray-100"></div>
        <div className="flex items-start gap-3">
          <i className="ri-map-pin-2-fill text-red-500 text-base mt-0.5"></i>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-400 font-semibold uppercase">Destination</p>
            <p className="text-sm font-medium text-gray-800 truncate">{ride?.destination || 'Dropoff location'}</p>
          </div>
        </div>
        <div className="border-t border-gray-100"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Total Fare</span>
          <span className="text-lg font-bold text-gray-900">₹{ride?.fare || 160}</span>
        </div>
      </div>
    </div>
  );
};

export default WaiteforDriver;