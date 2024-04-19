import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import ApiThread from "../../helpers/ApiThread";
import createPostBg from "../Post/CreatePost.jpg"; // Ensure the path is correct

const CreateThread = () => {
  const [threadData, setThreadData] = useState({
    title: "",
    description: "",
    tag: "event", // Default value is event
  });

  const handleChange = (name, value) => {
    setThreadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Authentication token not found.");
    }

    try {
      await ApiThread.studentCreateThread(threadData, token);
      toast.success("🎉 Thread created successfully!");
    } catch (error) {
      toast.error("❌ Thread creating event: " + error.message);
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
            Create Thread
          </h1>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Thread Title:
            </label>
            <input
              type="text"
              name="threadTitle"
              value={threadData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="form-input w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Thread Description:
            </label>
            <input
              type="text"
              name="threadDescription"
              value={threadData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Thread Tags:
            </label>
            <select
              name="threadTags"
              value={threadData.tag}
              onChange={(e) => handleChange("tag", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            >
              <option value="event">Event</option>
              <option value="opinion">Opinion</option>
              <option value="question">Question</option>
              <option value="rant">Rant</option>
              <option value="others">Others</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Add Thread
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateThread;
