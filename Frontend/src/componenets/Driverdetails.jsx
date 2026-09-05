import { useContext } from 'react';
import { DriverDataContext } from '../context/DriverContext';

const Driverdetails = ({ isOnline, setIsOnline }) => {
  const { driver } = useContext(DriverDataContext);

  const fullname = driver?.fullname
    ? `${driver.fullname.firstname} ${driver.fullname.lastname || ''}`.trim()
    : 'Driver Partner';

  const vehicle = driver?.vehicle || {};

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl p-5 border border-gray-100 max-w-md mx-auto space-y-4">
      {/* Header with Online/Offline Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              className="h-12 w-12 rounded-full object-cover border-2 border-black"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
              alt="Driver profile"
            />
            <span
              className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-white ${
                isOnline ? 'bg-emerald-500' : 'bg-gray-400'
              }`}
            ></span>
          </div>
          <div>
            <h4 className="font-bold text-base text-gray-900">{fullname}</h4>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              {vehicle.vehicleType || 'Sedan'} • {vehicle.vehicleNumberPlate || 'DL 01 AB 1234'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOnline(!isOnline)}
          className={`px-4 py-2 rounded-full font-bold text-xs transition shadow-xs flex items-center gap-1.5 ${
            isOnline
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-gray-500'}`}></span>
          <span>{isOnline ? 'ONLINE' : 'GO ONLINE'}</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-2.5 pt-1">
        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Today's Earnings</p>
          <p className="text-lg font-extrabold text-gray-900 mt-0.5">₹1,420</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Trips</p>
          <p className="text-lg font-extrabold text-gray-900 mt-0.5">7</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Rating</p>
          <p className="text-lg font-extrabold text-amber-500 mt-0.5 flex items-center justify-center gap-1">
            <i className="ri-star-fill text-sm"></i> 4.92
          </p>
        </div>
      </div>
    </div>
  );
};

export default Driverdetails;