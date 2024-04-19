import React, { useEffect, useState } from "react";
import ApiPost from "../../helpers/ApiPost";
import ApiThread from "../../helpers/ApiThread";
import moment from "moment";
import { useParams } from "react-router-dom";
import CustomDialog from "../../components/CustomDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import Post from "./Post";

function PostsinThreads() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postDescription, setPostDescription] = useState("");

  useEffect(() => {
    reloadPosts();
  }, []);

  const reloadPosts = () => {
    const token = localStorage.getItem("token");
    try {
      ApiThread.getPostsInThreads(id, token).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setPosts(data);
          });
        } else {
          console.error("Failed to fetch posts", response);
        }
      });
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  const openAdd = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Authentication token not found.");
    }

    try {
      await ApiPost.studentCreatePost(id, postDescription, token);
      toast.success("🎉 Post created successfully!");
      reloadPosts();
    } catch (error) {
      toast.error("❌ Error creating post: " + error.message);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Registered Events</h1>
        <div className="flex justify-center items-center">
          <button className="p-2.5 flex items-center" onClick={openAdd}>
            <Icon
              icon="simple-line-icons:plus"
              className="text-xl rounded-md text-orange-500"
            />
            <h1 className="font-bold text-orange-500 text-2xl ml-3">
              Create Post
            </h1>
          </button>
        </div>
      </div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isDialogOpen && (
        <CustomDialog
          title="Add Post"
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="postDescription"
                onChange={(e) => setPostDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Post
              </button>
            </div>
          </form>
        </CustomDialog>
      )}
    </div>
  );
}

export default PostsinThreads;
