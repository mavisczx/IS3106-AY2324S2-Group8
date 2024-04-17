const SERVER_PREFIX = "http://localhost:8080/api";

const ApiPost = {

  createPost(data, token) {

    return fetch(`${SERVER_PREFIX}/post`, {
      headers: {

        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      method: "POST",
      body: JSON.stringify(data),
    });
  },

  retrievePostById(id) {

    return fetch(`${SERVER_PREFIX}/post/${id}`, {
      headers: {

        "Content-Type": "application/json",
      },

      method: "GET",
    });
  },

  retrieveAllPosts() {

    return fetch(`${SERVER_PREFIX}/post`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",

    });

  },

  updatePost(id, data, token) {

    return fetch(`${SERVER_PREFIX}/post/${id}`, {
      headers: {

        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      method: "PUT",
      body: JSON.stringify(data),

    });
  },

  deletePost(id, token) {

    return fetch(`${SERVER_PREFIX}/post/${id}`, {
      headers: {

        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      
      method: "DELETE",
    });
  },

};

export default ApiPost;
