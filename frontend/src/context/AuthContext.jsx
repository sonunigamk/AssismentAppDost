// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { checkAuthStatus } from '../api/userApi'; // Import our new API function

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Add a new loading state to handle the initial auth check
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
                // If it fails (e.g., no token, invalid token), the user is not logged in.
                // We don't need to do anything, user will remain null.
                console.log('User not authenticated on initial load.');
            } finally {
                // No matter what, we are done with the initial check.
                setLoading(false);
            }
        };

        verifyUser();
    }, []); // The empty dependency array [] means this runs only once.

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const contextValue = {
        user,
        loading, // Pass the loading state down
        login,
        logout,
    };

    // While we are checking, we can show a loading screen for the whole app.
    // This prevents any "flickering" or premature redirects.
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