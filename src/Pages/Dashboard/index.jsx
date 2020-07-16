import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NewBudget from "./NewBudget";
import Budgets from "./Budgets";

const Dashboard = () => {
  let page;
  if (localStorage.user) {
    page = (
      <Switch>
        <Route path="/dashboard" exact component={Budgets} />
        <Route path="/dashboard/create-budget" exact component={NewBudget} />
      </Switch>
    );
  } else {
    return <Redirect to="/login" />;
  }
  return <div className="dashboard">{page}</div>;
};

export default Dashboard;
