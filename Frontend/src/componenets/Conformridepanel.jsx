import { useState } from 'react';

const Conformridepanel = ({ ride, onStartTrip, onCancelTrip, isStarting }) => {
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!ride) return null;

  const user = ride.user || {};
  const userName = user.fullname ? `${user.fullname.firstname} ${user.fullname.lastname || ''}`.trim() : 'Customer';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length < 4) {
      setErrorMsg('Please enter the 6-digit OTP from the customer');
      return;
    }
    setErrorMsg('');
    onStartTrip(otp.trim());
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-auto">
      <div className="bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 max-w-md mx-auto space-y-4 animate-in fade-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Arrived at Pickup</span>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">Pickup Customer</h3>
          </div>
          <span className="text-xl font-extrabold text-gray-900">₹{ride.fare || 160}</span>
        </div>

        {/* Customer card */}
        <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop"
              alt="Customer"
              className="h-12 w-12 rounded-full object-cover border"
            />
            <div>
              <h4 className="font-bold text-sm text-gray-900">{userName}</h4>
              <p className="text-xs text-gray-500">{user.email || 'Verified Rider'}</p>
            </div>
          </div>
          <a
            href="tel:+919876543210"
            className="h-10 w-10 bg-black text-white rounded-full flex items-center justify-center shadow-xs hover:bg-gray-800 transition"
            aria-label="Call passenger"
          >
            <i className="ri-phone-fill text-lg"></i>
          </a>
        </div>

        {/* Route Details */}
        <div className="space-y-2.5 bg-white p-3 rounded-2xl border border-gray-200 text-sm">
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

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Enter 6-Digit Passenger OTP
            </label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 123456"
              className="w-full text-center tracking-[0.3em] font-mono text-2xl font-bold py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none focus:bg-white transition"
              required
            />
            {errorMsg && <p className="text-xs text-red-600 font-medium mt-1">{errorMsg}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={onCancelTrip}
              className="w-full py-3 px-4 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isStarting}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm transition flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
            >
              {isStarting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Start Trip</span>
                  <i className="ri-play-fill text-base"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Conformridepanel;