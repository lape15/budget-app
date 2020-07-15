import axios from "axios";
let user;
let token;
if (localStorage.user) {
  user = JSON.parse(localStorage.getItem("user"));
  token = user.token;
}
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

const makeBudgetCall = (method, data) => {
  switch (method) {
    case "post":
      return axios({
        method: method,
        url: "https://atumaatu.herokuapp.com/v1/budgets",
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

    case "get":
      return axios({
        method: method,
        url: "https://atumaatu.herokuapp.com/v1/budgets",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

    default:
      return;
  }
};

export { makeAuthenticatedApiCall, makeBudgetCall };
