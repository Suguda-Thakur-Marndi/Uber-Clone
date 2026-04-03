import { useState } from 'react'
import { Link } from 'react-router-dom'

const DriverSign = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Driver, setDriver] = useState('{}')

  const submitHandle = (e) => {
    e.preventDefault()
    setDriver({ 
      email:email,
       password:password })
    setEmail('')
    setPassword('')
  }

  return (
    <div className='flex flex-col justify-between p-4 h-screen'>
      <div>
        <div className="p-7">
          <form onSubmit={submitHandle}>
            <div className="flex justify-center pb-8">
              <img className="h-16 w-24 p-4" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" />
            </div>
            <h3 className="mb-2 text-xl">
              What's your email (Driver)
            </h3>
            <input
              className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="email"
              placeholder="Your email"
            />
            <h3 className="mb-2 text-xl">
              Enter Your Password
            </h3>
            <input
              className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required
              type="password"
              placeholder="Enter Password"
            />
            <button type="submit" className="bg-[#111] text-white mb-7 rounded px-4 py-2 border w-full">
              Login
            </button>
            <p className="text-center">
              Don't have an account? <Link to="/driver-signup" className="bg-black text-white px-4 py-2 rounded">Create Account</Link>
            </p>
          </form>
        </div>
      </div>
         <Link
        to="/login"
        className="mt-auto flex justify-center rounded-2xl text-xl mb-5 py-3 w-full bg-green-500"
      >
        Sign up as user
      </Link>

      
    </div>
  )
}

export default DriverSign