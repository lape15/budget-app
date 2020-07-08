import React, { useEffect } from "react";
import logo from "../../assets/budget-it.png";
import { TimelineLite } from "gsap";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx";

const Auth = () => {
  let tl = new TimelineLite({ paused: true });

  useEffect(() => {
    tl.fromTo(
      ".text1",
      2,
      {
        width: "0",
      },
      {
        width: "260px",
        ease: "steps(20)",
      },
      0
    );

    tl.fromTo(
      ".text1",
      0.5,
      { borderRightColor: "rgba(255,255,255,0.8)" },
      {
        repeat: -1,
        ease: "steps(14)",
        borderRightColor: "rgba(255,255,255,0)",
      },
      0
    ).fromTo(
      ".text2",
      2,
      {
        width: "0",
      },
      {
        width: "340px",
        ease: "steps(20)",
        delay: 2,
      },
      0
    );

    tl.fromTo(
      ".text2",
      0.5,
      { borderRightColor: "rgba(255,255,255,0.8)" },
      {
        repeat: -1,
        ease: "steps(14)",
        borderRightColor: "rgba(255,255,255,0)",
      },
      0
    );
    tl.play();
  }, []);

  if (localStorage.user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="auth">
      <div className="side">
        <Link to="/" className="img-link">
          <img src={logo} alt="BudgetIt logo" />{" "}
        </Link>

        <h3 className="text-1">Your free account is only 2 seconds away</h3>
        <div className="text1">
          <em> Budget your spending...</em>
        </div>
        <div className="text2">
          <em>Budgeting never felt so good...</em>
        </div>
      </div>
      <div className="reg-form">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
