import React, { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { IoMdMore } from 'react-icons/io';

import { AuthContext } from '../context/AuthContext';
import { deletePost } from '../api/postApi';

const PostCard = ({ post, onDelete, onEdit }) => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const TRUNCATE_LENGTH = 150;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isOwner = user && user._id === post.author?._id;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const deletePromise = deletePost(post._id);
      toast.promise(deletePromise, {
        loading: 'Deleting post...',
        success: (data) => {
          onDelete(post._id);
          return data.message || 'Post deleted successfully!';
        },
        error: 'Failed to delete post.',
      });
    }
    setIsMenuOpen(false);
  };

  const handleEdit = () => {
    onEdit(post);
    setIsMenuOpen(false);
  };

  const shouldTruncate = post.content.length > TRUNCATE_LENGTH;
  const displayedContent = isExpanded ? post.content : `${post.content.substring(0, TRUNCATE_LENGTH)}${shouldTruncate ? '...' : ''}`;

  return (
    <div className="bg-white p-4 rounded-sm shadow">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center">
          <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
            <span className="text-xl font-bold">
              {post.author?.name ? post.author.name.charAt(0).toUpperCase() : 'A'}
            </span>
          </div>
          <div>
            <div className="font-bold text-gray-900">{post.author?.name || 'Anonymous'}</div>
            <div className="text-xs text-gray-500">{formatDate(post.createdAt)}</div>
          </div>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <IoMdMore size={24} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-xl ring-1 ring-black ring-opacity-5">
                <button onClick={handleEdit} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                  Edit Post
                </button>
                <button onClick={handleDelete} className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
                  Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="whitespace-pre-wrap text-gray-700">{displayedContent}</p>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 font-semibold text-blue-600 hover:underline"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};

export default PostCard;