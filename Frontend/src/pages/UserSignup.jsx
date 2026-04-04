import { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setuserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      fullName: {
      firstName,
      lastName,
      },
      email,
      password,
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

          <h3 className="text-xl">First Name</h3>
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

export default UserSignup