import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../assets/context/Usercontext'

const UserSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      )

      if (response.status === 201) {
        const data = response.data
        localStorage.setItem('token', data.token)
        setUser(data.user)
        navigate('/Home')
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message)
    }

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
          <input className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full" autoComplete="username" required type="email" value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} placeholder="Your email" />

          <h3 className="mb-2 text-xl">Enter Your Password</h3>
          <input className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full" autoComplete="new-password" required type="password" value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} placeholder="Enter Password" />

          <button type="submit" className="bg-[#111] text-white mb-7 rounded px-4 py-2 border w-full">
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