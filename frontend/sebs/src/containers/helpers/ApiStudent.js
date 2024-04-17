const SERVER_PREFIX = "http://localhost:8080/ebs-war/webresources";

const ApiStudent = {
  createStudent(data) {
    return fetch(`${SERVER_PREFIX}/student`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  retrieveStudentById(token) {
    return fetch(`${SERVER_PREFIX}/student`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  checkUsernameTaken(username) {
    return fetch(`${SERVER_PREFIX}/student/checkUsername/${username}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  updateStudentProfile(data, token) {
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
    return fetch(`${SERVER_PREFIX}/student/changePassword`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  listAllEventsCreated(token) {
    return fetch(`${SERVER_PREFIX}/student/eventsCreated`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  viewAllEventsRegistered(token) {
    return fetch(`${SERVER_PREFIX}/student/eventsRegistered`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  registerForEvent(eId, token) {
    return fetch(`${SERVER_PREFIX}/student/register/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  },

  unregisterForEvent(eId, token) {
    return fetch(`${SERVER_PREFIX}/student/unregister/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  },

  isEventOwner(eId, token) {
    return fetch(`${SERVER_PREFIX}/student/checkEventOwner/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  checkRegistrationForEvent(eId, token) {
    return fetch(`${SERVER_PREFIX}/student/checkRegistration/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },
};

export default ApiStudent;
