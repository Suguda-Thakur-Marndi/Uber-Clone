import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DriverDataContext } from '../context/DriverContext';

const DriverProtected = ({ children }) => {
    const { setDriver } = useContext(DriverDataContext);
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const verifyDriver = async () => {
            if (!token || userType !== 'driver') {
                navigate('/driver-sign');
                setIsChecking(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/drivers/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data?.driver) {
                    setDriver(response.data.driver);
                }
            } catch (error) {
                console.error('Driver verification failed:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('userType');
                setDriver(null);
                navigate('/driver-sign');
            } finally {
                setIsChecking(false);
            }
        };

        verifyDriver();
    }, [token, userType, navigate, setDriver]);

    if (isChecking) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="flex flex-col items-center gap-3">
                    <span className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></span>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Verifying Driver Session...</p>
                </div>
            </div>
        );
    }

    if (!token || userType !== 'driver') return null;

    return <>{children}</>;
};

export default DriverProtected;