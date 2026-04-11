const Home = () => {
  return (
    <div className="h-screen relative overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
        <img className="h-16 w-24 p-4" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" />
      </div>
      <img className="w-full h-full object-cover" src="https://i.sstatic.net/gtiI7.gif" alt="" role="presentation" /> 
      <div className=" flex flex-col justify-end absolute h-screen top-0 w-full px-0 py-8 rounded-t-3xl shadow-lg">
        <div className="h-[30%] p-5 w-full bg-white">
          <h4 className="text-3xl font-bold mb-6 text-gray-900">
            Find Trip
          </h4>
          <form className="space-y-4">
            <input 
              className="bg-gray-100 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition" 
              type="text" 
              placeholder="📍 Add Pickup location" 
            />
            <input 
              className="bg-gray-100 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition" 
              type="text" 
              placeholder="🎯 Enter your destination" 
            />
          </form>
        </div>
        <div className="bg-red-500 h-[70%] p-5 w-full hidden">

        </div>
      </div>
    </div>
  )
}

export default Home
