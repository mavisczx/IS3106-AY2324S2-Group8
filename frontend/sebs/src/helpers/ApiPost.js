const SERVER_PREFIX = "http://localhost:8080/ebs-war/webresources";

const ApiPost= {
  createPost(data, token) {
    return fetch(`${SERVER_PREFIX}/post`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },


  getPostById(eId, token) {
    return fetch(`${SERVER_PREFIX}/post/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  editPost(eId, data, token) {
    return fetch(`${SERVER_PREFIX}/post/${eId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deletePost(eId, token) {
    return fetch(`${SERVER_PREFIX}/post/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  },

  searchPost(searchValue) {
    const queryString = searchValue.toString();
    return fetch(`${SERVER_PREFIX}/post/query?${queryString}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },
  
  searchAllPost() {
    return fetch(`${SERVER_PREFIX}/post/all`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

};

export default ApiPost;
