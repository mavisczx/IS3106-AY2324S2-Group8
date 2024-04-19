const SERVER_PREFIX = "http://localhost:8080/ebs-war/webresources";

const ApiThread = {
  studentCreateThread(data, token) {
    return fetch(`${SERVER_PREFIX}/thread`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  adminCreateThread(data, token) {
    return fetch(`${SERVER_PREFIX}/thread/admin`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getThreadById(tId, token) {
    return fetch(`${SERVER_PREFIX}/thread/${tId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  getThreads(token) {
    return fetch(`${SERVER_PREFIX}/thread/allThreads`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  getThreadCreatorName(tId, token) {
    return fetch(`${SERVER_PREFIX}/thread/creatorName/${tId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
  },

  getPostsInThreads(tId, token) {
    return fetch(`${SERVER_PREFIX}/thread/postsInThread/${tId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  editThread(tId, data, token) {
    return fetch(`${SERVER_PREFIX}/thread/${tId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  studentDeleteThread(tId, token) {
    return fetch(`${SERVER_PREFIX}/thread/student/${tId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  },

  adminDeleteThread(tId, token) {
    return fetch(`${SERVER_PREFIX}/thread/admin/${tId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  },

  searchThread(searchValue) {
    const queryString = searchValue.toString();
    return fetch(`${SERVER_PREFIX}/thread/query?${queryString}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  
  getAllThread()  {
    return fetch(`${SERVER_PREFIX}/thread/all`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
},

  
};



export default ApiThread;
