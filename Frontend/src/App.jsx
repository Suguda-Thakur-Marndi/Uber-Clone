import { Route, Routes, Navigate } from 'react-router-dom';
import Start from './pages/Start';
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import DriverSign from './pages/DriverSign';
import DriverSignup from './pages/DriverSignup';
import Home from './pages/Home';
import UserLogout from './pages/UserLogout';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import DriverHome from './pages/Driverhome';
import DriverProtected from './pages/DriverProtected';

const App = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/driver-sign" element={<DriverSign />} />
        <Route path="/driver-login" element={<DriverSign />} />
        <Route path="/driver-signup" element={<DriverSignup />} />

        {/* Protected User Routes */}
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route path="/Home" element={<Navigate to="/home" replace />} />

        {/* Protected Driver Routes */}
        <Route
          path="/driver-home"
          element={
            <DriverProtected>
              <DriverHome />
            </DriverProtected>
          }
        />
        <Route path="/Driverhome" element={<Navigate to="/driver-home" replace />} />
        <Route path="/driverhome" element={<Navigate to="/driver-home" replace />} />

        <Route path="/logout" element={<UserLogout />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
