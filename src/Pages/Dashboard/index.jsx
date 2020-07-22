import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NewBudget from "./NewBudget";
import Budgets from "./Budgets";
import SingleBudget from "./SingleBudget";

const Dashboard = (props) => {
  let page;
  if (localStorage.user) {
    page = (
      <Switch>
        <Route
          path="/dashboard"
          exact
          render={(props) => <Budgets {...props} />}
        />

        <Route
          path="/dashboard/create-budget"
          exact
          render={(props) => <NewBudget {...props} />}
        />

        <Route
          path="/dashboard/budgets/:id"
          exact
          render={(props) => <SingleBudget {...props} />}
        />
      </Switch>
    );
  } else {
    return <Redirect to="/login" />;
  }
  return <div className="dashboard">{page}</div>;
};

export default Dashboard;
