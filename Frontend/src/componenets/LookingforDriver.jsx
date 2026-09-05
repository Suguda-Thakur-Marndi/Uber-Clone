import React from 'react';

const LookingforDriver = ({ pickup, destination, fare, selectedVehicle, onCancel }) => {
  return (
    <div className="p-6 max-w-lg mx-auto space-y-5 text-center">
      {/* Radar Animation */}
      <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></div>
        <div className="absolute inset-2 rounded-full bg-emerald-500/30 animate-pulse"></div>
        <div className="relative z-10 w-16 h-16 rounded-full bg-black text-white flex items-center justify-center shadow-xl">
          <i className="ri-car-fill text-2xl text-emerald-400"></i>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900">Contacting nearby drivers...</h3>
        <p className="text-xs text-gray-500 mt-1">Please wait while the closest driver accepts your request</p>
      </div>

      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 space-y-3 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase text-gray-500">Vehicle</span>
          <span className="text-sm font-bold text-gray-900">{selectedVehicle?.name || 'Uber Go'}</span>
        </div>
        <div className="border-t border-gray-200"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase text-gray-500">Pickup</span>
          <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">{pickup}</span>
        </div>
        <div className="border-t border-gray-200"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase text-gray-500">Destination</span>
          <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">{destination}</span>
        </div>
        <div className="border-t border-gray-200"></div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase text-gray-500">Estimated Fare</span>
          <span className="text-base font-extrabold text-emerald-600">{fare || '₹160'}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="w-full py-3 px-4 rounded-xl border-2 border-red-200 bg-red-50 text-red-700 font-bold hover:bg-red-100 active:scale-[0.99] transition"
      >
        Cancel Search
      </button>
    </div>
  );
};

export default LookingforDriver;