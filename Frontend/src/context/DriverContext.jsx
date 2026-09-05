import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const DriverDataContext = createContext(null);

const DriverProvider = ({ children }) => {
    const [driver, setDriver] = useState(() => {
        try {
            const stored = localStorage.getItem('driver');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateAndStoreDriver = (driverData) => {
        setDriver(driverData);
        if (driverData) {
            localStorage.setItem('driver', JSON.stringify(driverData));
        } else {
            localStorage.removeItem('driver');
        }
    };

    const clearDriver = () => {
        updateAndStoreDriver(null);
    };

    const value = {
        driver,
        setDriver: updateAndStoreDriver,
        captain: driver, // Captain alias
        setCaptain: updateAndStoreDriver,
        isLoading,
        setIsLoading,
        error,
        setError,
        clearDriver
    };

    return (
        <DriverDataContext.Provider value={value}>
            {children}
        </DriverDataContext.Provider>
    );
};

export default DriverProvider;
