import React from 'react';

const Confirmvichel = ({
  pickup,
  destination,
  selectedVehicle,
  onConfirmRide,
  onClose,
  isBooking
}) => {
  const vehicle = selectedVehicle || {
    name: 'Uber Go',
    price: '₹160',
    img: 'https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png'
  };

  return (
    <div className="p-5 max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">Confirm your Ride</h3>
        <button
          type="button"
          onClick={onClose}
          className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
          aria-label="Close"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>

      <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <img src={vehicle.img} alt={vehicle.name} className="h-16 w-20 object-contain rounded" />
        <div className="flex-1">
          <h4 className="font-bold text-lg text-gray-900">{vehicle.name}</h4>
          <p className="text-xs text-gray-500">Instant confirmation • Cash or UPI</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-extrabold text-gray-900">{vehicle.price}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3.5 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <i className="ri-map-pin-user-fill text-sm"></i>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Pickup Location</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{pickup || 'Current Location'}</p>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200"></div>

        <div className="flex items-start gap-3">
          <div className="mt-1 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
            <i className="ri-map-pin-2-fill text-sm"></i>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Destination</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{destination || 'Destination Point'}</p>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200"></div>

        <div className="flex items-start gap-3">
          <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <i className="ri-wallet-3-fill text-sm"></i>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Payment</p>
            <p className="text-sm font-semibold text-gray-800">Cash / UPI to Driver</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={isBooking}
        onClick={onConfirmRide}
        className="w-full bg-black hover:bg-gray-800 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl transition duration-150 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
      >
        {isBooking ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>Requesting Ride...</span>
          </>
        ) : (
          <>
            <span>Confirm & Request {vehicle.name}</span>
            <i className="ri-arrow-right-line"></i>
          </>
        )}
      </button>
    </div>
  );
};

export default Confirmvichel;