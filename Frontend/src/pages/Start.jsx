import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div className="h-screen w-screen flex flex-col justify-between p-6 bg-cover bg-center relative font-sans"
            style={{
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%), url('https://images.unsplash.com/photo-1512950050685-b1d4ae637323?auto=format&fit=crop&w=1200&q=80')`
            }}
        >
            {/* Brand Header */}
            <div className="pt-4 flex items-center justify-between z-10">
                <img
                    className="h-9 w-auto object-contain brightness-200"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="Uber logo"
                />
                <Link
                    to="/driver-sign"
                    className="text-xs font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md px-3.5 py-1.5 rounded-full transition"
                >
                    Drive with us
                </Link>
            </div>

            {/* Bottom Call to Action Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl space-y-4 max-w-md mx-auto w-full border border-white/40 z-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Move with safety
                    </h1>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        Request a ride in seconds, track your driver live, and reach your destination with ease.
                    </p>
                </div>

                <div className="space-y-2.5 pt-1">
                    <Link
                        to="/login"
                        className="w-full bg-black hover:bg-gray-800 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-between shadow-lg"
                    >
                        <span>Continue as Rider</span>
                        <i className="ri-arrow-right-line text-lg"></i>
                    </Link>

                    <Link
                        to="/driver-sign"
                        className="w-full bg-gray-100 hover:bg-gray-200 active:scale-[0.99] text-gray-900 font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-between"
                    >
                        <span>Sign in as Driver Partner</span>
                        <i className="ri-steering-2-line text-lg text-emerald-600"></i>
                    </Link>
                </div>

                <p className="text-[10px] text-gray-400 text-center pt-1">
                    By proceeding, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default Start;
