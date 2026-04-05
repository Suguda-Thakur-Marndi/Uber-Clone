import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import DriverSign from './pages/DriverSign'
import DriverSignup from './pages/DriverSignup'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/driver-sign' element={<DriverSign />} />
        <Route path='/driver-signup' element={<DriverSignup />} />
        <Route path='/Home' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
