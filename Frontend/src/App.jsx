import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/userLogin'
import Driversign from './pages/Driversign'
import Driversigup from './pages/Driversigup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/Driversign' element={<Driversign/>} />
        <Route path='/Driversighup' element={<Driversigup/>} />
        
      </Routes>
    </div>

  )
}
export default App
