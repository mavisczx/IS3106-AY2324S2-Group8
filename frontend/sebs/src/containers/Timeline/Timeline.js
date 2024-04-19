import React, { useState, useEffect } from 'react';
import ApiThread from '../../helpers/ApiThread';
import Thread from '../Thread/Thread';

function Timeline() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);

  useEffect(() => {
    // Fetch all threads from the API
    ApiThread.getAllThread().then((response) => {
      setThreads(response.data);
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
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Timeline</h1>
        <div className="space-y-4">
          {threads.map((thread) => (
            <div key={thread.id}>
              <div
                className="bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer"
                onClick={() => toggleThread(thread.id)}
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-orange-500 rounded-full w-8 h-8 flex items-center justify-center">
                    <i className="fas fa-comment-alt text-white"></i>
                  </div>
                  <h2 className="text-lg font-bold">{thread.title}</h2>
                </div>
                <p className="text-gray-400 mt-2">{thread.description}</p>
              </div>
              {selectedThread === thread.id && (
                <Thread thread={thread} />
              )}
              <div className="border-b border-gray-700 my-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
