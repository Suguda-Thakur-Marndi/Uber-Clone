import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import DriverSign from './pages/DriverSign'
import DriverSignup from './pages/DriverSignup'
import Home from './pages/Home'
import UserLogout from './pages/UserLogout'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import DriverHome from './pages/Driverhome'
import DriverProtected from './pages/DriverProtected'
import Captainride from './pages/Captainride'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/driver-sign' element={<DriverSign />} />
        <Route path='/driver-signup' element={<DriverSignup />} />
        <Route
          path='/Home'
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route path='/logout' element={<UserLogout />} />
        <Route
          path='/Driverhome'
          element={
            <DriverProtected>
              <DriverHome />
            </DriverProtected>
          }
        />
        <Route
          path='/Captainride'
          element={
            <DriverProtected>
              <Captainride />
            </DriverProtected>
          }
        />
      </Routes>
    </div>
  )
}

export default App
