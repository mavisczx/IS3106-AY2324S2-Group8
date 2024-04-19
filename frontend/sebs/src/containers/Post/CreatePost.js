import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import ApiPost from "../../helpers/ApiPost";
import createPostBg from "../Post/CreatePost.jpg";

const CreatePost = () => {
  const [postDescription, setPostDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Authentication token not found.");
    }

    try {
      await ApiPost.createPost({ postDescription }, token);
      toast.success("🎉 Post created successfully!");
    } catch (error) {
      toast.error("❌ Error creating post: " + error.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-white-100 -m-10"
      style={{
        backgroundImage: `url(${createPostBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-xl p-8 bg-black bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-bold text-white mb-6">
          <div className="p-2.5 mt-1 flex items-center justify-center">
            <Icon
              icon="ic:baseline-school"
              className="text-xl rounded-md text-orange-500"
            />
            <h1 className="font-bold text-stone-200 text-3xl ml-3">
              ExchangeBuddy
            </h1>
          </div>
          <h1 className="text-center font-bold text-white text-2xl ml-3">
            Create Post
          </h1>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Post Description:
            </label>
            <input
              type="text"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              className="form-input w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
