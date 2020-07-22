import React, { useEffect, useRef } from "react";
import "./styles/main.scss";
import { TweenMax } from "gsap";
import { withRouter } from "react-router-dom";
import Nav from "./Pages/Dashboard/Nav.jsx";
import Routes from "./Routes";
function App(props) {
  let app = useRef(null);

  useEffect(() => {
    TweenMax.to(app, 0, { css: { visibility: "visible" } });
  }, []);

  return (
    <div className="App" ref={(el) => (app = el)}>
      <Nav />
      <Routes />
    </div>
  );
}

export default withRouter(App);
