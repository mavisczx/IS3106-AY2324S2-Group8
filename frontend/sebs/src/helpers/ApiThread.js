const SERVER_PREFIX = "http://localhost:8080/ebs-war/webresources";

const ApiThread= {
  createThead(data, token) {
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


  getThreadById(eId, token) {
    return fetch(`${SERVER_PREFIX}/ehread/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  editThread(eId, data, token) {
    return fetch(`${SERVER_PREFIX}/thread/${eId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteThread(eId, token) {
    return fetch(`${SERVER_PREFIX}/thread/${eId}`, {
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

};

export default ApiThread;
