// src/components/CreatePostForm.jsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createPost } from '../api/postApi';

// This component receives a function 'onPostCreated' as a prop
// It will call this function after a new post is successfully created.
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
      const newPost = await createPost(content);
      toast.success('Post created successfully!');
      setContent(''); // Clear the textarea after posting
      onPostCreated(newPost); // Notify the parent component (Home.jsx)
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create post.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          rows="3"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        ></textarea>
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:bg-blue-400"
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