import { createContext, useState } from 'react';

export const DriverDataContext = createContext();

export const DriverContext = ({ children }) => {
  const [driver, setDriver] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateDriver = (driverData) => {
    setDriver(driverData);
  };

  const clearDriver = () => {
    setDriver(null);
  };

  const value = {
    driver,
    setDriver,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateDriver,
    clearDriver,
  };

  return (
    <DriverDataContext.Provider value={value}>
      {children}
    </DriverDataContext.Provider>
  );
};
export default DriverContext