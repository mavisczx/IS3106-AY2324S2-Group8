import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiPost from '../../helpers/ApiPost';
import { Icon } from '@iconify/react/dist/iconify.js';

function Thread({ thread }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts for the selected thread
    ApiPost.getPostsByThreadId(thread.id).then((response) => {
      setPosts(response.data);
    });
  }, [thread.id]);

  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-4 space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <img
              src={post.userProfilePic}
              alt="User Profile"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h3 className="font-bold">{post.user}</h3>
              <p className="text-sm text-gray-400">{post.timestamp}</p>
            </div>
          </div>
          <img
            src={post.postImage}
            alt="Post"
            className="w-full h-auto rounded-lg mt-4"
          />
          <div className="flex items-center space-x-2 mt-2">
            <Icon icon="mdi:heart" className="text-red-500" />
            <span>{post.likes} likes</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Thread;
