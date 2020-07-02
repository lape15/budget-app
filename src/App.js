import React, { useEffect, useRef } from "react";
import Header from "./Components/Header.jsx";
import "./styles/main.scss";
import Landing from "./Pages/Landing.jsx";
import { TweenMax } from "gsap";
import { Switch, Route } from "react-router-dom";

function App() {
  let app = useRef(null);
  useEffect(() => {
    TweenMax.to(app, 0, { css: { visibility: "visible" } });
  });
  return (
    <div className="App" ref={(el) => (app = el)}>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
