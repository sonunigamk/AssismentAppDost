import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../context/AuthContext';
import { getMyPosts } from '../api/postApi';
import { deleteUserProfile, updateUserProfile } from '../api/userApi';
import PostCard from '../components/PostCard';
import Modal from '../components/Modal';
import EditProfileForm from '../components/EditProfileForm';
import EditPostForm from '../components/EditPostForm';
import CreatePostForm from '../components/CreatePostForm';

const Profile = () => {
    const { user, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        // This effect will run after the initial check in AuthProvider
        if (!user) {
            navigate('/login');
        } else {
            const fetchMyPosts = async () => {
                setLoading(true);
                try {
                    const posts = await getMyPosts();
                    setMyPosts(posts);
                } catch (error) {
                    toast.error("Failed to fetch your posts.");
                } finally {
                    setLoading(false);
                }
            };
            fetchMyPosts();
        }
    }, [user, navigate]);

    const handleProfileUpdate = (updatedUser) => {
        login(updatedUser);
        setIsEditProfileModalOpen(false);
    };

    const confirmDeleteAccount = async () => {
        try {
            await deleteUserProfile();
            logout();
            toast.success('Your account has been deleted.');
            navigate('/signup');
        } catch (error) {
            toast.error('Failed to delete account.');
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    const handleNewPost = (newPostData) => {
        const postWithAuthor = { ...newPostData, author: { _id: user._id, name: user.name } };
        setMyPosts(prevPosts => [postWithAuthor, ...prevPosts]);
        setIsCreateModalOpen(false);
    };

    const handleDeletePost = (postId) => {
        setMyPosts(prevPosts => prevPosts.filter(p => p._id !== postId));
    };

    const handleEditPost = (postToEdit) => {
        setEditingPost(postToEdit);
    };

    const handleUpdatePost = (updatedPost) => {
        setMyPosts(prevPosts =>
            prevPosts.map(p => (p._id === updatedPost._id ? updatedPost : p))
        );
        setEditingPost(null);
    };

    // --- THIS IS THE FIX ---
    // If the user object is not yet available (during the initial load),
    // return null to prevent trying to render with null data.
    if (!user) {
        return null;
    }
    // --- END OF FIX ---

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto max-w-3xl px-4 py-8">
                <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                    <div className="flex items-center">
                        <div className="mr-6 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                            <span className="text-3xl font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                            <p className="text-md text-gray-600">{user.email}</p>
                        </div>
                        <div className="ml-auto text-center">
                            <p className="text-2xl font-bold text-gray-800">{myPosts.length}</p>
                            <p className="text-sm text-gray-500">Posts</p>
                        </div>
                    </div>
                    <div className="mt-4 flex space-x-2 border-t pt-4">
                        <button onClick={() => setIsEditProfileModalOpen(true)} className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
                            Edit Profile
                        </button>
                        <button onClick={() => setIsDeleteModalOpen(true)} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                            Delete Account
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-800">My Posts</h2>
                    {loading ? (
                        <p className="text-center text-gray-500">Loading your posts...</p>
                    ) : (
                        <div className="space-y-4">
                            {myPosts.length > 0 ? (
                                myPosts.map(post => (
                                    <PostCard
                                        key={post._id}
                                        post={post}
                                        onDelete={handleDeletePost}
                                        onEdit={handleEditPost}
                                    />
                                ))
                            ) : (
                                <div className="rounded-lg bg-white p-6 text-center text-gray-500">
                                    You haven't created any posts yet.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="fixed bottom-8 right-8 z-20 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Create new post"
                >
                    + New Post
                </button>

                <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                    <CreatePostForm onPostCreated={handleNewPost} />
                </Modal>

                <Modal isOpen={isEditProfileModalOpen} onClose={() => setIsEditProfileModalOpen(false)}>
                    <EditProfileForm
                        user={user}
                        onProfileUpdated={handleProfileUpdate}
                        onCancel={() => setIsEditProfileModalOpen(false)}
                    />
                </Modal>

                {editingPost && (
                    <Modal isOpen={!!editingPost} onClose={() => setEditingPost(null)}>
                        <EditPostForm
                            post={editingPost}
                            onPostUpdated={handleUpdatePost}
                            onCancel={() => setEditingPost(null)}
                        />
                    </Modal>
                )}

                <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                    <div className="p-4 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Are you sure?</h2>
                        <p className="my-4 text-gray-600">
                            This action cannot be undone. All of your posts will be permanently deleted along with your account.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="rounded-md bg-gray-200 px-6 py-2 font-semibold text-gray-800 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteAccount}
                                className="rounded-md bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </Modal>

            </div>
        </div>
    );
};

export default Profile;