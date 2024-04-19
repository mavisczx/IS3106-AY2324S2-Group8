import React, { useState, useEffect } from "react";
import ApiThread from "../../helpers/ApiThread";
import Thread from "../Thread/Thread";

function Timeline() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);

  useEffect(() => {
    // Fetch all threads from the API
    const token = localStorage.getItem("token");
    ApiThread.getThreads(token).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setThreads(data);
        });
      } else {
        console.error("Failed to fetch threads");
      }
    });
  }, []);

  const toggleThread = (threadId) => {
    if (selectedThread === threadId) {
      setSelectedThread(null);
    } else {
      setSelectedThread(threadId);
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="space-y-4">
        {threads.map((thread) => (
          <div key={thread.id}>
            <div
              className="bg-gray-800 rounded-lg shadow-md p-2 cursor-pointer "
              onClick={() => toggleThread(thread.id)}
            >
              <div className="flex items-center space-x-2">
                <div className="bg-orange-500 rounded-full w-2 h-2 flex items-center justify-center">
                  <i className="fas fa-comment-alt text-white"></i>
                </div>
                <h2 className="text-lg font-bold">{thread.title}</h2>
              </div>
              <p className="text-gray-400 mt-2">{thread.description}</p>
            </div>
            {selectedThread === thread.id && <Thread thread={thread} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
