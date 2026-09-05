import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserProtectedWrapper = ({ children }) => {
    const { setUser } = useContext(UserDataContext);
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            if (!token) {
                navigate('/login');
                setIsChecking(false);
                return;
            }

            if (userType === 'driver') {
                navigate('/driver-home');
                setIsChecking(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data?.user) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error('User verification error:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('userType');
                setUser(null);
                navigate('/login');
            } finally {
                setIsChecking(false);
            }
        };

        verifyUser();
    }, [token, userType, navigate, setUser]);

    if (isChecking) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-3">
                    <span className="w-8 h-8 border-3 border-black border-t-transparent rounded-full animate-spin"></span>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (!token) return null;

    return <>{children}</>;
};

export default UserProtectedWrapper;