import React from 'react';

const Raidepopup = ({ ride, onAccept, onIgnore }) => {
  if (!ride) return null;

  const user = ride.user || {};
  const userName = user.fullname ? `${user.fullname.firstname} ${user.fullname.lastname || ''}`.trim() : 'Customer';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-auto">
      <div className="bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 max-w-md mx-auto space-y-4 animate-in fade-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              New Ride Request
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-1">₹{ride.fare || 160}</h3>
          </div>
          <span className="text-xs bg-gray-100 font-semibold text-gray-700 px-3 py-1.5 rounded-full">
            {ride.distance ? `${(ride.distance / 1000).toFixed(1)} km away` : 'Nearby'}
          </span>
        </div>

        {/* Customer snippet */}
        <div className="flex items-center gap-3.5 bg-gray-50 p-3 rounded-2xl border border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop"
            alt="Customer"
            className="h-12 w-12 rounded-full object-cover border"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-sm text-gray-900 truncate">{userName}</h4>
            <p className="text-xs text-gray-500">⭐ 4.8 Rating • Cash / Online</p>
          </div>
        </div>

        {/* Trip details */}
        <div className="space-y-3 bg-white p-3 rounded-2xl border border-gray-200 text-sm">
          <div className="flex items-start gap-2.5">
            <i className="ri-map-pin-user-fill text-emerald-600 mt-0.5"></i>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase text-gray-400">Pickup</p>
              <p className="text-xs font-medium text-gray-800 truncate">{ride.pickup}</p>
            </div>
          </div>
          <div className="border-t border-gray-100"></div>
          <div className="flex items-start gap-2.5">
            <i className="ri-map-pin-2-fill text-red-500 mt-0.5"></i>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase text-gray-400">Drop-off</p>
              <p className="text-xs font-medium text-gray-800 truncate">{ride.destination}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={onIgnore}
            className="w-full py-3 px-4 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 active:scale-[0.99] transition text-sm"
          >
            Ignore
          </button>
          <button
            type="button"
            onClick={() => onAccept(ride)}
            className="w-full py-3 px-4 rounded-xl bg-black hover:bg-gray-800 active:scale-[0.99] text-white font-bold transition text-sm flex items-center justify-center gap-1.5 shadow-md"
          >
            <span>Accept Ride</span>
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Raidepopup;