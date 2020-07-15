import React, { useEffect, useRef } from "react";
import "./styles/main.scss";
import Landing from "./Pages/Landing.jsx";
import { TweenMax } from "gsap";
import { Switch, Route, withRouter } from "react-router-dom";
import Auth from "./Pages/Auth/index.jsx";
import Dashboard from "./Pages/Dashboard/index.jsx";
import Nav from "./Pages/Dashboard/Nav.jsx";

function App(props) {
  let app = useRef(null);

  useEffect(() => {
    TweenMax.to(app, 0, { css: { visibility: "visible" } });
    if (localStorage.user) {
      props.history.push("/dashboard");
    }
  }, [props.history]);

  return (
    <div className="App" ref={(el) => (app = el)}>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/(login|register)/" exact component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
