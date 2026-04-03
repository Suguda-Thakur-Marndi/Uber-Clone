import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import DriverSign from './pages/Driversign'
import DriverSignup from './pages/Driversigup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/driver-sign' element={<DriverSign/>} />
        <Route path='/driver-signup' element={<DriverSignup/>} />
        
      </Routes>
    </div>

  )
}
export default App
