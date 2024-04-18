const SERVER_PREFIX = "http://localhost:8080/ebs-war/webresources";

const ApiAdmin = {
  createAdmin(data, token) {
    return fetch(`${SERVER_PREFIX}/admin`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  retrieveAdminById(token) {
    return fetch(`${SERVER_PREFIX}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  updateAdmin(data, token) {
    return fetch(`${SERVER_PREFIX}/admin`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  changePassword(data, token) {
    return fetch(`${SERVER_PREFIX}/admin/passwordChange`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  getCreatedEvents(token) {
    return fetch(`${SERVER_PREFIX}/admin/createdEvents`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  isEventOwner(eId, token) {
    return fetch(`${SERVER_PREFIX}/admin/checkEventOwner/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },
};

export default ApiAdmin;
