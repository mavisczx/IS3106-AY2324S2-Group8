const SERVER_PREFIX = "http://localhost:8080/ebs-war/webresources";

const ApiAuth = {
  authenticateStudent(data) {
    return fetch(`${SERVER_PREFIX}/authentication`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  authenticateAdmin(data) {
    return fetch(`${SERVER_PREFIX}/authentication/admin`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export default ApiAuth;
