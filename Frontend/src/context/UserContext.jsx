import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('user');
            return stored ? JSON.parse(stored) : {
                _id: '',
                email: '',
                fullname: { firstname: '', lastname: '' }
            };
        } catch {
            return { _id: '', email: '', fullname: { firstname: '', lastname: '' } };
        }
    });

    const updateAndStoreUser = (userData) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    };

    return (
        <UserDataContext.Provider value={{ user, setUser: updateAndStoreUser }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserProvider;