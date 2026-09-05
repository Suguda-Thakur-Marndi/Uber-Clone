import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DriverDataContext } from '../context/DriverContext';
import { SocketContext } from '../context/SocketContext';

const DriverSign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setDriver } = useContext(DriverDataContext);
  const { joinUser } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/drivers/login`, {
        email: email.trim().toLowerCase(),
        password
      });

      if (response.status === 200) {
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
      console.error('Driver login failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Invalid driver email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto font-sans">
      <div className="pt-4">
        <div className="flex items-center justify-between pb-8">
          <div className="flex items-center gap-2">
            <img
              className="h-8 w-auto object-contain"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber logo"
            />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded">
              Driver
            </span>
          </div>
          <Link to="/login" className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition">
            Rider Login
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Partner Portal</h2>
        <p className="text-xs text-gray-500 mb-6">Sign in to start driving and accept ride requests</p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
            <i className="ri-error-warning-fill text-sm text-red-500"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
              Driver Email
            </label>
            <input
              className="bg-gray-50 border border-gray-200 focus:border-black focus:bg-white rounded-xl px-4 py-3 text-sm w-full outline-none transition font-medium"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="driver@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
              Password
            </label>
            <input
              className="bg-gray-50 border border-gray-200 focus:border-black focus:bg-white rounded-xl px-4 py-3 text-sm w-full outline-none transition font-medium"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Sign In as Driver</span>
                <i className="ri-arrow-right-line"></i>
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 pt-2">
            Want to drive with Uber?{' '}
            <Link to="/driver-signup" className="text-black font-bold hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <Link
          to="/login"
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 transition shadow-xs"
        >
          <i className="ri-user-fill text-sm"></i>
          <span>Sign in as Rider instead</span>
        </Link>
      </div>
    </div>
  );
};

export default DriverSign;