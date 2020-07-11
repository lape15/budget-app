import React from "react";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
  let page;
  if (localStorage.user) {
    page = <div>Heyyyy</div>;
  } else {
    return <Redirect to="/login" />;
  }
  return <div className="dashboard">{page}</div>;
};

export default Dashboard;
