import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createPost } from '../api/postApi';

const CreatePostForm = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            toast.error('Post content cannot be empty.');
            return;
        }

        setLoading(true);
        try {
            // The onPostCreated prop is now optional, making the component more reusable.
            const newPost = await createPost(content);
            toast.success('Post created successfully!');
            setContent('');
            if (onPostCreated) {
                onPostCreated(newPost);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create post.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        // The main container for the form
        <div>
            {/* 1. The Title you wanted */}
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Create New Post</h2>

            <form onSubmit={handleSubmit}>
                {/* The Text Area */}
                <textarea
                    className="w-full rounded-md border border-gray-300 p-3 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows="5"
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={loading}
                ></textarea>

                {/* --- 2. Improved Spacing and Button Alignment --- */}
                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-5 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                        disabled={loading}
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePostForm;