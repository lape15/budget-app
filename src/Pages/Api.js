import axios from "axios";

const makeAuthenticatedApiCall = (method, path, data) => {
  return axios({
    method: method,
    url: `https://atumaatu.herokuapp.com/v1/${path}/`,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { makeAuthenticatedApiCall };
