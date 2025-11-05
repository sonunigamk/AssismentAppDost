import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { updateUserProfile } from '../api/userApi';

const EditProfileForm = ({ user, onProfileUpdated, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);

    // When the component loads, pre-fill the form with the user's current data
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
            });
        }
    }, [user]);

    const { name, email } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedUser = await updateUserProfile({ name, email });
            onProfileUpdated(updatedUser); // Send the updated user object back to the Profile page
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    // If there's no user prop, don't render anything
    if (!user) return null;

    return (
        <div>
            <h2 className="mb-4 text-2xl font-bold">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        required
                        disabled={loading}
                    />
                </div>

                {/* Email Input */}
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
                        required
                        disabled={loading}
                    />
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-300"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-400"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;