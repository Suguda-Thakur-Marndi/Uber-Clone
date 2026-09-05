import { createContext, useEffect, useState, useMemo } from 'react';
import { io } from 'socket.io-client';

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext(null);

const SOCKET_SERVER_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

const SocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);

    const socket = useMemo(() => {
        return io(SOCKET_SERVER_URL, {
            transports: ['websocket', 'polling'],
            autoConnect: true,
            withCredentials: true
        });
    }, []);

    useEffect(() => {
        const onConnect = () => {
            console.log('[Socket] Connected to server:', socket.id);
            setIsConnected(true);

            // Re-join if user or driver token exists
            const userStr = localStorage.getItem('user');
            const driverStr = localStorage.getItem('driver');
            const userType = localStorage.getItem('userType');

            if (userType === 'user' && userStr) {
                try {
                    const u = JSON.parse(userStr);
                    if (u._id) socket.emit('join', { userId: u._id, userType: 'user' });
                } catch (e) {
                    console.error(e);
                }
            } else if (userType === 'driver' && driverStr) {
                try {
                    const d = JSON.parse(driverStr);
                    if (d._id) socket.emit('join', { userId: d._id, userType: 'driver' });
                } catch (e) {
                    console.error(e);
                }
            }
        };

        const onDisconnect = () => {
            console.log('[Socket] Disconnected from server');
            setIsConnected(false);
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [socket]);

    const joinUser = (userId, role = 'user') => {
        if (socket && userId) {
            socket.emit('join', { userId, userType: role });
        }
    };

    const updateLocation = (userId, location) => {
        if (socket && userId && location) {
            socket.emit('update-location-driver', { userId, location });
        }
    };

    return (
        <SocketContext.Provider value={{ socket, isConnected, joinUser, updateLocation }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;