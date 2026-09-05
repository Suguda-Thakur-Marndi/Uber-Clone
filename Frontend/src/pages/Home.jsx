import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Locationpanel from '../componenets/Locationpanel';
import Vichelpanel from '../componenets/Vichelpanel';
import Confirmvichel from '../componenets/Confirmvichel';
import WaiteforDriver from '../componenets/WaiteforDriver';
import LookingforDriver from '../componenets/LookingforDriver';
import LiveMap from '../componenets/LiveMap';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [activeField, setActiveField] = useState('pickup');
  const [suggestions, setSuggestions] = useState([]);

  const [pickupCoords, setPickupCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [driverCoords, setDriverCoords] = useState(null);

  const [fares, setFares] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);
  const [tripStatus, setTripStatus] = useState('idle'); // idle | searching | confirmed | ongoing | completed

  // Panel toggles
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRideOpen, setConfirmRideOpen] = useState(false);
  const [lookingForDriverOpen, setLookingForDriverOpen] = useState(false);
  const [waitingForDriverOpen, setWaitingForDriverOpen] = useState(false);

  // DOM Refs for GSAP
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  // Token header helper
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  // GSAP Animations
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '70%', duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(panelRef.current, { height: '0%', duration: 0.3, ease: 'power2.in' });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(0%)', duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)', duration: 0.3, ease: 'power2.in' });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRideOpen) {
      gsap.to(confirmRideRef.current, { transform: 'translateY(0%)', duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(confirmRideRef.current, { transform: 'translateY(100%)', duration: 0.3, ease: 'power2.in' });
    }
  }, [confirmRideOpen]);

  useGSAP(() => {
    if (lookingForDriverOpen) {
      gsap.to(lookingForDriverRef.current, { transform: 'translateY(0%)', duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(lookingForDriverRef.current, { transform: 'translateY(100%)', duration: 0.3, ease: 'power2.in' });
    }
  }, [lookingForDriverOpen]);

  useGSAP(() => {
    if (waitingForDriverOpen) {
      gsap.to(waitingForDriverRef.current, { transform: 'translateY(0%)', duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(waitingForDriverRef.current, { transform: 'translateY(100%)', duration: 0.3, ease: 'power2.in' });
    }
  }, [waitingForDriverOpen]);

  // Debounced Suggestion Fetching
  const fetchSuggestions = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${encodeURIComponent(query)}`,
        getAuthHeader()
      );
      if (Array.isArray(res.data)) {
        setSuggestions(res.data);
      }
    } catch (err) {
      console.warn('Autocomplete fetch failed:', err.message);
    }
  }, []);

  const handleInputChange = (e, field) => {
    const val = e.target.value;
    if (field === 'pickup') {
      setPickup(val);
      setActiveField('pickup');
    } else {
      setDestination(val);
      setActiveField('destination');
    }
    setPanelOpen(true);
    fetchSuggestions(val);
  };

  const handleSelectSuggestion = async (address) => {
    if (activeField === 'pickup') {
      setPickup(address);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates?address=${encodeURIComponent(address)}`,
          getAuthHeader()
        );
        if (res.data?.ltd) setPickupCoords(res.data);
      } catch (err) {
        console.warn('Geocoding pickup failed:', err.message);
      }
    } else {
      setDestination(address);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates?address=${encodeURIComponent(address)}`,
          getAuthHeader()
        );
        if (res.data?.ltd) setDestCoords(res.data);
      } catch (err) {
        console.warn('Geocoding dest failed:', err.message);
      }
    }

    setPanelOpen(false);
  };

  // Fetch Fare when both pickup and destination are provided
  const findTrip = async (e) => {
    if (e) e.preventDefault();
    if (!pickup || !destination) {
      alert('Please enter both pickup and destination');
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`,
        getAuthHeader()
      );

      setFares(res.data);
      setPanelOpen(false);
      setVehiclePanelOpen(true);
    } catch (err) {
      console.error('Fare error:', err.response?.data || err.message);
      alert('Could not calculate fare for this route. Please try a different location.');
    }
  };

  // Select Vehicle Type
  const handleSelectVehicle = (vehicleType, option) => {
    setSelectedVehicle({
      id: vehicleType,
      name: option.name,
      price: option.price,
      img: option.img
    });
    setVehiclePanelOpen(false);
    setConfirmRideOpen(true);
  };

  // Create Ride
  const handleConfirmRide = async () => {
    setIsBooking(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType: selectedVehicle?.id || 'car'
        },
        getAuthHeader()
      );

      setCurrentRide(res.data);
      setTripStatus('searching');
      setConfirmRideOpen(false);
      setLookingForDriverOpen(true);
    } catch (err) {
      console.error('Ride booking failed:', err.response?.data || err.message);
      alert('Booking failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsBooking(false);
    }
  };

  // Socket Event Handlers
  useEffect(() => {
    if (!socket) return;

    const onRideConfirmed = (rideData) => {
      console.log('[Rider Socket] Ride Confirmed:', rideData);
      setCurrentRide(rideData);
      setTripStatus('confirmed');
      setLookingForDriverOpen(false);
      setWaitingForDriverOpen(true);

      if (rideData?.driver?.location) {
        setDriverCoords(rideData.driver.location);
      }
    };

    const onRideStarted = (rideData) => {
      console.log('[Rider Socket] Ride Started:', rideData);
      setCurrentRide(rideData);
      setTripStatus('ongoing');
    };

    const onRideEnded = (rideData) => {
      console.log('[Rider Socket] Ride Ended:', rideData);
      setCurrentRide(rideData);
      setTripStatus('completed');
      setWaitingForDriverOpen(false);
    };

    socket.on('ride-confirmed', onRideConfirmed);
    socket.on('ride-started', onRideStarted);
    socket.on('ride-ended', onRideEnded);

    return () => {
      socket.off('ride-confirmed', onRideConfirmed);
      socket.off('ride-started', onRideStarted);
      socket.off('ride-ended', onRideEnded);
    };
  }, [socket]);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gray-50 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-xs">
        <div className="flex items-center gap-3">
          <img
            className="h-7 w-auto object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber logo"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-700 hidden sm:inline">
            Hello, {user?.fullname?.firstname || 'Rider'}
          </span>
          <button
            onClick={() => navigate('/logout')}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-3 py-1.5 rounded-full transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Ongoing Trip Banner */}
      {tripStatus === 'ongoing' && (
        <div className="fixed top-14 left-4 right-4 z-20 bg-linear-to-r from-emerald-600 to-teal-700 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-100 font-semibold">Trip in Progress</p>
              <h4 className="text-sm font-bold">Enjoy your ride to {destination}</h4>
            </div>
          </div>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-mono font-bold">
            ₹{currentRide?.fare}
          </span>
        </div>
      )}

      {/* Completed Trip Modal */}
      {tripStatus === 'completed' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl">
              <i className="ri-check-double-line"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Trip Completed!</h3>
            <p className="text-sm text-gray-500">Thank you for riding with Uber. Hope you had a smooth trip.</p>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-xs font-semibold uppercase text-gray-400">Total Paid</p>
              <p className="text-2xl font-extrabold text-gray-900">₹{currentRide?.fare || 160}</p>
            </div>
            <button
              onClick={() => {
                setTripStatus('idle');
                setCurrentRide(null);
                setPickup('');
                setDestination('');
                setPickupCoords(null);
                setDestCoords(null);
              }}
              className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition"
            >
              Book Another Ride
            </button>
          </div>
        </div>
      )}

      {/* Main Interactive Live Map */}
      <div className="w-full h-full pt-14">
        <LiveMap
          pickupCoords={pickupCoords}
          destCoords={destCoords}
          driverCoords={driverCoords}
        />
      </div>

      {/* Floating Bottom Drawer / Search Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-end pointer-events-none">
        <div className="bg-white rounded-t-3xl shadow-2xl p-5 border-t border-gray-100 pointer-events-auto max-w-lg mx-auto w-full">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xl font-bold text-gray-900">Where to?</h4>
            {panelOpen && (
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-600 font-semibold"
              >
                Close
              </button>
            )}
          </div>

          <form onSubmit={findTrip} className="space-y-3 relative">
            <div className="relative">
              <div className="absolute left-3.5 top-3.5 text-emerald-600 text-base">
                <i className="ri-map-pin-user-fill"></i>
              </div>
              <input
                value={pickup}
                onChange={(e) => handleInputChange(e, 'pickup')}
                onFocus={() => {
                  setActiveField('pickup');
                  setPanelOpen(true);
                }}
                className="bg-gray-100 px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition pl-10 text-sm font-medium border border-transparent focus:border-black"
                type="text"
                placeholder="Enter pickup location"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute left-3.5 top-3.5 text-red-500 text-base">
                <i className="ri-map-pin-2-fill"></i>
              </div>
              <input
                value={destination}
                onChange={(e) => handleInputChange(e, 'destination')}
                onFocus={() => {
                  setActiveField('destination');
                  setPanelOpen(true);
                }}
                className="bg-gray-100 px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition pl-10 text-sm font-medium border border-transparent focus:border-black"
                type="text"
                placeholder="Where to?"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>Find Rides</span>
              <i className="ri-arrow-right-line"></i>
            </button>
          </form>
        </div>

        {/* Suggestion Dropdown Panel */}
        <div
          ref={panelRef}
          className="bg-white w-full max-w-lg mx-auto overflow-hidden pointer-events-auto shadow-2xl px-5"
          style={{ height: '0%' }}
        >
          <Locationpanel
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
            setPanel={setPanelOpen}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Vehicle Selection Drawer */}
      <Vichelpanel
        fares={fares}
        onSelectVehicle={handleSelectVehicle}
        setvichelpanel={setVehiclePanelOpen}
        vichelpanelref={vehiclePanelRef}
      />

      {/* Confirm Ride Drawer */}
      <div
        ref={confirmRideRef}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 transition-transform duration-300"
        style={{ transform: 'translateY(100%)' }}
      >
        <Confirmvichel
          pickup={pickup}
          destination={destination}
          selectedVehicle={selectedVehicle}
          isBooking={isBooking}
          onConfirmRide={handleConfirmRide}
          onClose={() => setConfirmRideOpen(false)}
        />
      </div>

      {/* Looking for Driver Modal */}
      <div
        ref={lookingForDriverRef}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 transition-transform duration-300"
        style={{ transform: 'translateY(100%)' }}
      >
        <LookingforDriver
          pickup={pickup}
          destination={destination}
          fare={selectedVehicle?.price}
          selectedVehicle={selectedVehicle}
          onCancel={() => {
            setLookingForDriverOpen(false);
            setTripStatus('idle');
          }}
        />
      </div>

      {/* Waiting for Driver Drawer */}
      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 transition-transform duration-300"
        style={{ transform: 'translateY(100%)' }}
      >
        <WaiteforDriver
          ride={currentRide}
          onClose={() => setWaitingForDriverOpen(false)}
        />
      </div>
    </div>
  );
};

export default Home;
