import React from "react";
import { Redirect } from "react-router-dom";
import Nav from "./Nav";

const Dashboard = () => {
  let page;
  if (localStorage.user) {
    page = <Nav />;
  } else {
    return <Redirect to="/login" />;
  }
  return <div className="dashboard">{page}</div>;
};

export default Dashboard;
