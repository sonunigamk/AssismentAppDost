import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../context/AuthContext';
import { getMyPosts } from '../api/postApi';
import { deleteUserProfile } from '../api/userApi';
import PostCard from '../components/PostCard';
import Modal from '../components/Modal';
import EditProfileForm from '../components/EditProfileForm';
import EditPostForm from '../components/EditPostForm';
import CreatePostForm from '../components/CreatePostForm'; // 1. Import CreatePostForm

const Profile = () => {
    const { user, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // 2. Add state for Create Post modal
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
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

    // --- All Handlers ---
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

    // 3. Add the handleNewPost function, just like in Home.jsx
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

    if (!user) {
        return null;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto max-w-3xl px-4 py-8">

                {/* Profile Header (no changes here) */}
                <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                    {/* ... */}
                </div>

                {/* User's Posts Feed */}
                <div>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-800">My Posts</h2>
                    {loading ? (
                        <p>Loading your posts...</p>
                    ) : (
                        <div className="space-y-4">
                            {myPosts.length > 0 ? (
                                myPosts.map(post => (<PostCard key={post._id} post={post} onDelete={handleDeletePost} onEdit={handleEditPost} />))
                            ) : (
                                <div className="rounded-lg bg-white p-6 text-center text-gray-500">
                                    You haven't created any posts yet.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* --- 4. Add the Floating Action Button and Create Post Modal --- */}
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
                {/* --- End of new section --- */}


                {/* All other modals (Edit Profile, Edit Post, Delete Account) are here */}
                <Modal isOpen={isEditProfileModalOpen} onClose={() => setIsEditProfileModalOpen(false)}>
                    <EditProfileForm user={user} onProfileUpdated={handleProfileUpdate} onCancel={() => setIsEditProfileModalOpen(false)} />
                </Modal>

                {editingPost && (
                    <Modal isOpen={!!editingPost} onClose={() => setEditingPost(null)}>
                        <EditPostForm post={editingPost} onPostUpdated={handleUpdatePost} onCancel={() => setEditingPost(null)} />
                    </Modal>
                )}

                <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                    
                </Modal>
            </div>
        </div>
    );
};

export default Profile;