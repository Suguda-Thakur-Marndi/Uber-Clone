import { useState } from 'react'
import { Link } from 'react-router-dom'

const DriverSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vehicleColour, setVehicleColour] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('sedan')

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        colour: vehicleColour,
        capacity: parseInt(vehicleCapacity),
        vehicleType: vehicleType
      }
    }

    console.log(userData)

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div>
      <div className="p-7">
        <form onSubmit={submitHandler}>
          <div className="flex justify-center pb-8">
            <img className="h-16 w-24 p-4" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" />
          </div>

          <h3 className="text-xl">First Name (Driver)</h3>
          <input type="text" value={firstName} onChange={(e) => {
            setFirstName(e.target.value)
          }} className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full" placeholder="Enter Your Name" />

          <h3 className="text-xl">Last Name</h3>
          <input type="text" value={lastName} onChange={(e) => {
            setLastName(e.target.value)
          }} className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full" placeholder="Enter Your Last Name" />

          <h3 className="mb-2 text-xl">What's your email</h3>
          <input className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full" required type="email" value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} placeholder="Your email" />

          <h3 className="mb-2 text-xl">Enter Your Password</h3>
          <input className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full" required type="password" value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} placeholder="Enter Password" />

          <h3 className="text-xl">Vehicle Colour</h3>
          <input type="text" value={vehicleColour} onChange={(e) => {
            setVehicleColour(e.target.value)
          }} className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full" placeholder="e.g., Red, Blue, Black" required />

          <h3 className="text-xl">Vehicle Capacity</h3>
          <input type="number" value={vehicleCapacity} onChange={(e) => {
            setVehicleCapacity(e.target.value)
          }} className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full" placeholder="e.g., 4, 5" min="1" required />

          <h3 className="text-xl">Vehicle Type</h3>
          <select value={vehicleType} onChange={(e) => {
            setVehicleType(e.target.value)
          }} className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full" required>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
            <option value="van">Van</option>
            <option value="truck">Truck</option>
          </select>

          <button className="bg-[#111] text-white mb-7 rounded px-4 py-2 border w-full">
            Create Account
          </button>

          <p className="text-center">
            Do You have an account? <Link to="/login" className="bg-black text-white px-4 py-2 rounded">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default DriverSignup


  