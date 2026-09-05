import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const { joinUser } = useContext(SocketContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email: email.trim(),
        password
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userType', 'user');
        setUser(user);
        if (joinUser && user?._id) {
          joinUser(user._id, 'user');
        }
        navigate('/home');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto font-sans">
      <div className="pt-4">
        <div className="flex items-center justify-between pb-8">
          <img
            className="h-8 w-auto object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber logo"
          />
          <Link to="/driver-sign" className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition">
            Drive with Uber
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">What's your email?</h2>
        <p className="text-xs text-gray-500 mb-6">Sign in to request rides and manage trips</p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
            <i className="ri-error-warning-fill text-sm text-red-500"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
              Email Address
            </label>
            <input
              className="bg-gray-50 border border-gray-200 focus:border-black focus:bg-white rounded-xl px-4 py-3 text-sm w-full outline-none transition font-medium"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
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
                <span>Continue</span>
                <i className="ri-arrow-right-line"></i>
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 pt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-black font-bold hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <Link
          to="/driver-sign"
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm"
        >
          <i className="ri-steering-2-fill text-base"></i>
          <span>Sign in as a Driver Partner</span>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
