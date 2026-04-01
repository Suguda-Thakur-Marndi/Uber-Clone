import { Link } from 'react-router-dom'
const UserLogin = () => {
  return (
    <div>
      <div className="p-7">
        <form>
          <div className="flex justify-center pb-8">
             <img className="h-16 w-24 p-4" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" />
          </div>
          <h3 className="mb-2 text-xl">
            What's your email
          </h3>
          <input className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full" required type="email" placeholder="Your email" />
          <h3 className="mb-2 text-xl">
            Enter Your Password
          </h3>
          <input className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full" required type="password" placeholder="Enter Password" />
          <button className="bg-[#111] text-white mb-7 rounded px-4 py-2 border w-full">
            Login
          </button>
        
          <p className="text-center">
            Don't have an account? <Link to="/signup" className="bg-black text-white px-4 py-2 rounded">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default UserLogin