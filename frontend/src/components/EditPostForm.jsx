import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { updatePost } from '../api/postApi';

const EditPostForm = ({ post, onPostUpdated, onCancel }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (post) {
            setContent(post.content);
        }
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            toast.error('Post content cannot be empty.');
            return;
        }

        setLoading(true);
        try {
            const updatedPost = await updatePost(post._id, content);
            toast.success('Post updated successfully!');
            onPostUpdated(updatedPost);
        } catch (error) {
            toast.error('Failed to update post.');
        } finally {
            setLoading(false);
        }
    };

    if (!post) return null;

    return (
        <div>
            <h2 className="mb-4 text-2xl font-bold">Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    rows="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={loading}
                ></textarea>
                <div className="mt-4 flex justify-end space-x-2">
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

export default EditPostForm;