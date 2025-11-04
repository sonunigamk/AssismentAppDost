// src/pages/Home.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../context/AuthContext';
import { getAllPosts } from '../api/postApi';
import CreatePostForm from '../components/CreatePostForm';
import PostCard from '../components/PostCard';

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    // --- 1. The new state for our hide/show logic ---
    const [isCreating, setIsCreating] = useState(false);

    // --- Protection and Data Fetching (no changes here) ---
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
                    toast.error('Failed to fetch posts.');
                } finally {
                    setLoadingPosts(false);
                }
            };
            fetchPosts();
        }
    }, [user, navigate]);

    const handleNewPost = (newPostData) => {
        const postWithAuthor = { ...newPostData, author: { _id: user._id, name: user.name } };
        setPosts([postWithAuthor, ...posts]);
        setIsCreating(false); // --- After posting, hide the form ---
    };

    if (!user) {
        return null; // Render nothing while redirecting
    }

    // --- Main Render with Conditional Logic ---
    return (
        <div className="container mx-auto max-w-2xl px-4 py-8">

            {/* --- 2. The Conditional Rendering Block --- */}
            <div className="mb-8">
                {isCreating ? (
                    // If isCreating is true, show the form
                    <CreatePostForm
                        onPostCreated={handleNewPost}
                        onCancel={() => setIsCreating(false)} // Pass a cancel function
                    />
                ) : (
                    // If isCreating is false, show the prompt button
                    <button
                        onClick={() => setIsCreating(true)}
                        className="w-full rounded-lg bg-white p-4 text-left text-gray-500 shadow-md hover:bg-gray-50"
                    >
                        Create a new post...
                    </button>
                )}
            </div>

            {/* The feed of recent posts (no changes here) */}
            <div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Recent Posts</h2>
                {loadingPosts ? (
                    <p>Loading posts...</p>
                ) : (
                    <div>
                        {posts.length > 0 ? (
                            posts.map((post) => <PostCard key={post._id} post={post} />)
                        ) : (
                            <p>No posts yet. Be the first to post!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;