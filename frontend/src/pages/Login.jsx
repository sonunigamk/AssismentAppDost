import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { loginUser } from '../api/userApi';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const { email, password } = formData;
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await loginUser(email, password);
            login(data.user);
            toast.success(data.message || 'Login successful!');
            navigate('/');

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            toast.error(errorMessage);
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-50" style={{ height: 'calc(100vh - 4rem)' }}>
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
                    Login to your account
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="you@example.com"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;