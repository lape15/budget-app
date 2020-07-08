import axios from "axios";

const makeAuthenticatedApiCall = (method, url, data) => {
  return axios({
    method: method,
    url: url,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { makeAuthenticatedApiCall };
