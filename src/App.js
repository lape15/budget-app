import React, { useEffect, useRef } from "react";
import Header from "./Components/Header.jsx";
import "./styles/main.scss";
import Landing from "./Pages/Landing.jsx";
import { TweenMax } from "gsap";
import { Switch, Route, withRouter } from "react-router-dom";
import Register from "./Pages/Auth/Register.jsx";
import Dashboard from "./Pages/Dashboard/index.jsx";

function App(props) {
  let app = useRef(null);
  useEffect(() => {
    TweenMax.to(app, 0, { css: { visibility: "visible" } });
  });

  return (
    <div className="App" ref={(el) => (app = el)}>
      {props.location.pathname === "/" ||
      props.location.pathname === "/dashboard" ? (
        <Header />
      ) : null}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
