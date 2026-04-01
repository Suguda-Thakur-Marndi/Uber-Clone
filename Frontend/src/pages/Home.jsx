import uberBackground from '/src/assets/b.png'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        
        <div className="h-screen pt-8 flex justify-between flex-col w-full bg-red-400" style={{ backgroundImage: `url(${uberBackground})`, backgroundSize: "cover" }}>
            <img className="h-16 w-24 p-4" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" />
            <div className='bg-white flex flex-col items-center justify-center pb-10 gap-4'>
                <h2 className="text-3xl font-bold">Get Started With Uber</h2>
                <Link to="/login" className="bg-black text-white w-48 py-2.5 rounded flex items-center justify-center">Continue</Link>
            </div>
        </div>
    )
}

export default Home
