import React from "react";
import Auth from "./Pages/Auth/index.jsx";
import Dashboard from "./Pages/Dashboard/index.jsx";
import Landing from "./Pages/Landing.jsx";
import { Switch, Route, withRouter } from "react-router-dom";
import BudgetsContextProvider from "./contexts/AuthReducer";

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/(login|register)/" exact component={Auth} />
      <BudgetsContextProvider>
        <Route path="/dashboard" component={Dashboard} />
      </BudgetsContextProvider>
    </Switch>
  );
};
export default withRouter(Routes);
