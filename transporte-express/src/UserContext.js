// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/current_user`, {
                    credentials: 'include',
                });
                const result = await response.json();
                setUser(result.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [BACKEND_URL]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
