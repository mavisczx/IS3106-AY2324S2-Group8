const SERVER_PREFIX = "http://localhost:8080/ebs-war/webresources";

const ApiEvent = {
  studentCreateEvent(data, token) {
    return fetch(`${SERVER_PREFIX}/event/student`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  adminCreateEvent(data, token) {
    return fetch(`${SERVER_PREFIX}/event/admin`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getEventById(eId, token) {
    return fetch(`${SERVER_PREFIX}/event/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  getEventSize(eId) {
    return fetch(`${SERVER_PREFIX}/event/eventSize/${eId}`, {
      method: "GET",
    });
  },

  editEvent(eId, data, token) {
    return fetch(`${SERVER_PREFIX}/event/${eId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  studentDeleteEvent(eId, token) {
    return fetch(`${SERVER_PREFIX}/event/student/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  },

  adminDeleteEvent(eId, token) {
    return fetch(`${SERVER_PREFIX}/event/admin/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  },

  viewAllRegistered(eId, token) {
    return fetch(`${SERVER_PREFIX}/event/registered/${eId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  searchAllEvents() {
    return fetch(`${SERVER_PREFIX}/event/all`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  searchEvents(searchValue) {
    const queryString = searchValue.toString();
    return fetch(`${SERVER_PREFIX}/event/query?${queryString}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  },

  searchEventDate(data) {
    return fetch(`${SERVER_PREFIX}/event/searchDate`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

export default ApiEvent;
