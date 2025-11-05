import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../context/AuthContext';
import { getAllPosts } from '../api/postApi';
import Modal from '../components/Modal';
import CreatePostForm from '../components/CreatePostForm';
import EditPostForm from '../components/EditPostForm';
import PostCard from '../components/PostCard';

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            const fetchPosts = async () => {
                setLoadingPosts(true);
                try {
                    const fetchedPosts = await getAllPosts();
                    setPosts(fetchedPosts);
                } catch (error) {
                    toast.error('Failed to fetch posts. Please try again.');
                } finally {
                    setLoadingPosts(false);
                }
            };
            fetchPosts();
        }
    }, [user, navigate]);

    const handleNewPost = (newPostData) => {
        const postWithAuthor = { ...newPostData, author: { _id: user._id, name: user.name } };
        setPosts(prevPosts => [postWithAuthor, ...prevPosts]);
        setIsCreateModalOpen(false);
    };

    const handleDeletePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(p => p._id !== postId));
    };

    const handleEditPost = (postToEdit) => {
        setEditingPost(postToEdit);
    };

    const handleUpdatePost = (updatedPost) => {
        setPosts(prevPosts =>
            prevPosts.map(p => (p._id === updatedPost._id ? updatedPost : p))
        );
        setEditingPost(null);
    };

    if (!user) {
        return null;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto max-w-2xl px-4 py-8">
                <div>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-800">Recent Posts</h2>
                    {loadingPosts ? (
                        <p className="text-center text-gray-500">Loading posts...</p>
                    ) : (
                        <div className="space-y-4">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostCard
                                        key={post._id}
                                        post={post}
                                        onDelete={handleDeletePost}
                                        onEdit={handleEditPost}
                                    />
                                ))
                            ) : (
                                <div className="rounded-lg bg-white p-6 text-center text-gray-500">
                                    No posts yet. Be the first to post!
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* THE ONLY "NEW POST" BUTTON - THE FLOATING ONE */}
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="fixed bottom-8 right-8 z-20 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Create new post"
                >
                    + New Post
                </button>

                {/* MODAL FOR CREATING A POST */}
                <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                    <CreatePostForm onPostCreated={handleNewPost} />
                </Modal>

                {/* MODAL FOR EDITING A POST */}
                {editingPost && (
                    <Modal isOpen={!!editingPost} onClose={() => setEditingPost(null)}>
                        <EditPostForm
                            post={editingPost}
                            onPostUpdated={handleUpdatePost}
                            onCancel={() => setEditingPost(null)}
                        />
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Home;