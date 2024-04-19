const SERVER_PREFIX = "http://localhost:8080/ebs-war/webresources";

const ApiPost = {
  studentCreatePost(tId, data, token) {
    return fetch(`${SERVER_PREFIX}/post/${tId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  adminCreatePost(tId, data, token) {
    return fetch(`${SERVER_PREFIX}/post/admin/${tId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  studentDeletePost(pId, token) {
    return fetch(`${SERVER_PREFIX}/post/student/${pId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  },

  adminDeletePost(pId, token) {
    return fetch(`${SERVER_PREFIX}/post/admin/${pId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  },

  getPosts(token) {
    return fetch(`${SERVER_PREFIX}/post/allPosts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },
};

export default ApiPost;
