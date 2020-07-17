import axios from "axios";
// let user;
// let token;

// console.log(localStorage.getItem("user"));

// if (localStorage.user) {
//   user = JSON.parse(localStorage.getItem("user"));
//   token = user.token;
// }

const makeUnAuthenticatedApiCall = (method, path, data) => {
  return axios({
    method: method,
    url: `https://atumaatu.herokuapp.com/v1/${path}/`,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const makeAuthenticatedApiCall = (method, path, data) => {
  if (localStorage.user) {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user.token;
    return axios({
      method: method,
      url: `https://atumaatu.herokuapp.com/v1/${path}`,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export { makeUnAuthenticatedApiCall, makeAuthenticatedApiCall };
