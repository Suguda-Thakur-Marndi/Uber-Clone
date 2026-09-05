import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

import LiveMap from '../componenets/LiveMap';
import Driverdetails from '../componenets/Driverdetails';
import Raidepopup from '../componenets/Raidepopup';
import Conformridepanel from '../componenets/Conformridepanel';
import FinishRide from '../componenets/Finishride';

import { SocketContext } from '../context/SocketContext';
import { DriverDataContext } from '../context/DriverContext';

const Driverhome = () => {
  const navigate = useNavigate();
  const { driver } = useContext(DriverDataContext);
  const { socket, joinUser } = useContext(SocketContext);

  const [isOnline, setIsOnline] = useState(true);
  const [incomingRide, setIncomingRide] = useState(null);
  const [activeRide, setActiveRide] = useState(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  // Helper auth header
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  // Join driver to socket room on mount
  useEffect(() => {
    if (driver?._id && socket) {
      joinUser(driver._id, 'driver');
    }
  }, [driver, socket, joinUser]);

  // Socket listener for new rides
  useEffect(() => {
    if (!socket || !isOnline) return;

    const onNewRide = (rideData) => {
      console.log('[Driver Socket] New ride incoming:', rideData);
      // Only show if not currently on an active trip
      if (!activeRide) {
        setIncomingRide(rideData);
      }
    };

    socket.on('new-ride', onNewRide);

    return () => {
      socket.off('new-ride', onNewRide);
    };
  }, [socket, isOnline, activeRide]);

  // Accept incoming ride
  const handleAcceptRide = async (ride) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: ride._id },
        getAuthHeader()
      );

      setActiveRide(res.data);
      setIncomingRide(null);
    } catch (err) {
      console.error('Accept ride failed:', err.response?.data || err.message);
      alert('Failed to accept ride: ' + (err.response?.data?.message || err.message));
      setIncomingRide(null);
    }
  };

  // Start trip with OTP
  const handleStartTrip = async (otp) => {
    if (!activeRide?._id) return;
    setIsStarting(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride?rideId=${activeRide._id}&otp=${otp}`,
        getAuthHeader()
      );

      setActiveRide(res.data);
    } catch (err) {
      console.error('Start ride error:', err.response?.data || err.message);
      alert('Incorrect OTP: ' + (err.response?.data?.message || 'Please verify the 6-digit PIN with the passenger'));
    } finally {
      setIsStarting(false);
    }
  };

  // Complete Ride
  const handleCompleteRide = async () => {
    if (!activeRide?._id) return;
    setIsCompleting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: activeRide._id },
        getAuthHeader()
      );

      setShowFinishModal(false);
      setActiveRide(null);
      alert('Trip completed! Fare collected successfully.');
    } catch (err) {
      console.error('Complete ride error:', err.response?.data || err.message);
      alert('Error ending ride: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gray-900 font-sans flex flex-col">
      {/* Top Driver Header */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
        <div className="flex items-center gap-3">
          <img
            className="h-7 w-auto object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Driver logo"
          />
          <span className="text-xs font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded">
            Driver Partner
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/driver-sign');
            }}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-3 py-1.5 rounded-full transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Active Trip Top Banner */}
      {activeRide && activeRide.status === 'ongoing' && (
        <div className="fixed top-16 left-4 right-4 z-20 bg-linear-to-r from-emerald-600 to-teal-700 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-white animate-pulse"></span>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-emerald-100 font-bold">Driving Passenger</p>
              <h4 className="text-sm font-bold truncate max-w-[220px]">To {activeRide.destination}</h4>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowFinishModal(true)}
            className="bg-white text-emerald-800 text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs hover:bg-emerald-50 transition"
          >
            Finish Ride
          </button>
        </div>
      )}

      {/* Background Interactive Live Map */}
      <div className="w-full h-full pt-14">
        <LiveMap showNearbyDrivers={false} />
      </div>

      {/* Driver Status Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pointer-events-none">
        <div className="pointer-events-auto">
          <Driverdetails isOnline={isOnline} setIsOnline={setIsOnline} />
        </div>
      </div>

      {/* Incoming Ride Request Popup */}
      {incomingRide && !activeRide && (
        <Raidepopup
          ride={incomingRide}
          onAccept={handleAcceptRide}
          onIgnore={() => setIncomingRide(null)}
        />
      )}

      {/* Accepted Ride: Waiting to Pickup & Enter OTP */}
      {activeRide && activeRide.status === 'accepted' && (
        <Conformridepanel
          ride={activeRide}
          isStarting={isStarting}
          onStartTrip={handleStartTrip}
          onCancelTrip={() => setActiveRide(null)}
        />
      )}

      {/* Trip Completion Modal */}
      {showFinishModal && activeRide && (
        <FinishRide
          ride={activeRide}
          isCompleting={isCompleting}
          onCompleteRide={handleCompleteRide}
        />
      )}
    </div>
  );
};

export default Driverhome;