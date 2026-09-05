import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DriverDataContext } from '../context/DriverContext';
import { SocketContext } from '../context/SocketContext';

const DriverSignup = () => {
  const navigate = useNavigate();
  const { setDriver } = useContext(DriverDataContext);
  const { joinUser } = useContext(SocketContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColour, setVehicleColour] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('4');
  const [vehicleType, setVehicleType] = useState('car');
  const [vehicleNumberPlate, setVehicleNumberPlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const driverData = {
      fullname: {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
      },
      email: email.trim().toLowerCase(),
      password,
      vehicle: {
        colour: vehicleColour.trim(),
        capacity: parseInt(vehicleCapacity, 10) || 4,
        vehicleType: vehicleType,
        vehicleNumberPlate: vehicleNumberPlate.trim().toUpperCase()
      }
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/drivers/register`,
        driverData
      );

      if (response.status === 201) {
        const { token, driver } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userType', 'driver');
        setDriver(driver);

        if (joinUser && driver?._id) {
          joinUser(driver._id, 'driver');
        }

        navigate('/driver-home');
      }
    } catch (err) {
      console.error('Driver signup failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto font-sans">
      <div className="pt-4">
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-2">
            <img
              className="h-8 w-auto object-contain"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber logo"
            />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded">
              Driver Partner
            </span>
          </div>
          <Link to="/driver-sign" className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition">
            Sign In
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Drive & Earn</h2>
        <p className="text-xs text-gray-500 mb-5">Register your vehicle and start taking rides</p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
            <i className="ri-error-warning-fill text-sm text-red-500"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-50 border border-gray-200 focus:border-black focus:bg-white rounded-xl px-3.5 py-2.5 text-sm w-full outline-none transition font-medium"
                placeholder="Alex"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-50 border border-gray-200 focus:border-black focus:bg-white rounded-xl px-3.5 py-2.5 text-sm w-full outline-none transition font-medium"
                placeholder="Driver"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-200 focus:border-black focus:bg-white rounded-xl px-3.5 py-2.5 text-sm w-full outline-none transition font-medium"
              placeholder="alex.driver@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-200 focus:border-black focus:bg-white rounded-xl px-3.5 py-2.5 text-sm w-full outline-none transition font-medium"
              placeholder="At least 6 characters"
            />
          </div>

          {/* Vehicle section */}
          <div className="pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">Vehicle Information</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1">Vehicle Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="bg-gray-50 border border-gray-200 focus:border-black focus:bg-white rounded-xl px-3 py-2.5 text-sm w-full outline-none transition font-medium"
                >
                  <option value="car">Car (Sedan/Hatchback)</option>
                  <option value="suv">SUV</option>
                  <option value="auto">Auto Rickshaw</option>
                  <option value="moto">Motorcycle / Bike</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1">Colour</label>
                <input
                  type="text"
                  required
                  value={vehicleColour}
                  onChange={(e) => setVehicleColour(e.target.value)}
                  className="bg-gray-50 border border-gray-200 focus:border-black focus:bg-white rounded-xl px-3 py-2.5 text-sm w-full outline-none transition font-medium"
                  placeholder="White / Silver"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1">Passenger Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  required
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  className="bg-gray-50 border border-gray-200 focus:border-black focus:bg-white rounded-xl px-3 py-2.5 text-sm w-full outline-none transition font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-1">License Plate No.</label>
                <input
                  type="text"
                  required
                  value={vehicleNumberPlate}
                  onChange={(e) => setVehicleNumberPlate(e.target.value.toUpperCase())}
                  className="bg-gray-50 border border-gray-200 focus:border-black focus:bg-white rounded-xl px-3 py-2.5 text-sm w-full outline-none transition font-medium font-mono uppercase"
                  placeholder="MH02AB1234"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50 mt-4"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Register as Partner</span>
                <i className="ri-arrow-right-line"></i>
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 pt-2">
            Already registered?{' '}
            <Link to="/driver-sign" className="text-black font-bold hover:underline">
              Partner Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default DriverSignup;