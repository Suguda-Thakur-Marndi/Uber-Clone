import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';

const UserSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

    const newUser = {
      fullname: {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
      },
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
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
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto font-sans">
      <div className="pt-4">
        <div className="flex items-center justify-between pb-6">
          <img
            className="h-8 w-auto object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber logo"
          />
          <Link to="/login" className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition">
            Sign In
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
        <p className="text-xs text-gray-500 mb-5">Sign up to get rides in minutes</p>

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
                placeholder="John"
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
                placeholder="Doe"
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
              placeholder="john.doe@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
              Create Password
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50 mt-4"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Create Account</span>
                <i className="ri-arrow-right-line"></i>
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-black font-bold hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>

      <p className="text-[11px] text-gray-400 text-center pt-4">
        By proceeding, you agree to receive ride updates and notifications.
      </p>
    </div>
  );
};

export default UserSignup;