import React from 'react';

const PostCard = ({ post }) => {
  // A helper function to make the date look nice, e.g., "December 25, 2023, 5:30 PM"
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    // This is the main "card form" with a white background and shadow
    <div className="mb-4 rounded-lg bg-white p-4 shadow-md">

      {/* 1. The username who posted it */}
      <div className="mb-2 flex items-center">
        {/* We can add a profile icon here next to the name later if we want */}
        <div className="font-bold text-gray-900">
          {/* We use "?." optional chaining here as a safety measure. 
              If the author is missing, it will show 'Anonymous' instead of crashing. */}
          {post.author?.name || 'Anonymous'}
        </div>
      </div>

      {/* 2. The content which was posted */}
      <p className="mb-3 text-gray-700">{post.content}</p>

      {/* 3. The time when the post was posted, aligned to the right */}
      <div className="text-right text-xs text-gray-500">
        {formatDate(post.createdAt)}
      </div>

    </div>
  );
};

export default PostCard;