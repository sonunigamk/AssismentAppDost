// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../context/AuthContext';
import { logoutUser } from '../api/userApi';
// We no longer need to import ProfileIcon from another file.

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            logout();
            toast.success('Logged out successfully!');
            navigate('/login');
        } catch (error) {
            logout();
            navigate('/login');
            console.error("Logout API call failed, but logging out on client.", error);
        }
    };

    return (
        <header className="sticky top-0 z-10 bg-white shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Left Side: Brand Name */}
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    LinkedIn
                </Link>

                {/* Right Side: Links/Profile */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        // --- Logged-in User View ---
                        <>
                            <div className="hidden sm:block font-semibold text-gray-700">Hi, {user.name}</div>

                            {/* --- YOUR SUGGESTED PROFILE ICON LOGIC --- */}
                            {/* This is the div that acts as the profile icon */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
                                <span className="text-xl font-bold">
                                    {/* Get the first letter of the name, or 'U' for User if name is missing */}
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </span>
                            </div>
                            {/* --- END OF PROFILE ICON LOGIC --- */}

                            <button
                                onClick={handleLogout}
                                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        // --- Logged-out User View ---
                        <>
                            <Link
                                to="/login"
                                className="rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;