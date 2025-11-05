// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { checkAuthStatus } from '../api/userApi'; // Import our new API function

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
 
    const [loading, setLoading] = useState(true);

    // This useEffect runs only ONCE when the app first loads
    useEffect(() => {
        const verifyUser = async () => {
            try {
                // Make the API call to check for a valid cookie
                const userData = await checkAuthStatus();
                // If successful, we get the user data back
                setUser(userData);
            } catch (error) {
                console.log('User not authenticated on initial load.');
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const contextValue = {
        user,
        loading, 
        login,
        logout,
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading Application...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };