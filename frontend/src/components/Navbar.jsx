// src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { logoutUser } from '../api/userApi';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <header className="sticky top-0 z-30 bg-white shadow-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    LinkedIn
                </Link>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="relative">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <div className="flex h-10 w-10  items-center justify-center rounded-full bg-blue-500 text-white">
                                    <span className="text-xl font-semibold">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                </div>
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-xl ring-1 ring-black ring-opacity-5">
                                    <div className="px-4 py-2 text-sm text-gray-700">
                                        <p className=" truncate text-sm ">Signed in as</p>
                                        <p className="truncate text-sm ">{user.email}</p>
                                    </div>
                                    <hr />

                                    {/* --- THIS IS THE NEW LINK --- */}
                                    <Link
                                        to="/"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Home
                                    </Link>
                                    {/* --- END OF NEW LINK --- */}

                                    <Link
                                        to="/profile"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Login
                            </Link>
                            <Link to="/signup" className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
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