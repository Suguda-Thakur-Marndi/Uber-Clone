import { Link } from 'react-router-dom'

const DriverSignup = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="p-7">
        <form>
          <div className="flex justify-center pb-8">
            <img
              className="h-16 w-24 p-4"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber logo"
            />
          </div>

          <h3 className="text-xl">Enter your Name (Driver)</h3>
          <input
            type="text"
            className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full"
            placeholder="Enter Your Name"
          />

          <h3 className="mb-2 text-xl">What's your email</h3>
          <input
            className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full"
            required
            type="email"
            placeholder="Your email"
          />

          <h3 className="mb-2 text-xl">Enter Your Password</h3>
          <input
            className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full"
            required
            type="password"
            placeholder="Enter Password"
          />

          <button className="bg-[#111] text-white mb-7 rounded px-4 py-2 border w-full">
            Create Account
          </button>

          <p className="text-center">
            Do you have an account?{' '}
            <Link to="/driver-sign" className="bg-black text-white px-4 py-2 rounded">
              Login
            </Link>
          </p>
        </form>
      </div>

    </div>
  )
}

export default DriverSignup


  