import React, { useState } from "react";
import logo from "../../assets/budget-it.png";
import { gsap } from "gsap";
import { withRouter, NavLink, Link } from "react-router-dom";

const Nav = (props) => {
  const [toggle, setToggle] = useState(true);

  let user;
  let first;
  let second;

  if (localStorage.user) {
    user = JSON.parse(localStorage.getItem("user"));
    first = user.firstName[0];
    second = user.lastName[0];
  }

  const handleToggle = () => {
    setToggle(!toggle);
    toggle
      ? gsap.to(".dropdown-box", {
          duration: 0.3,
          scale: 1,
          zIndex: 100,
          ease: "power3.easeOut",
        })
      : gsap.to(".dropdown-box", {
          duration: 0.3,
          scale: 0.2,
          zIndex: -1,
          ease: "none",
        });
  };

  const logOut = () => {
    localStorage.removeItem("user");
    props.history.push("/login");
  };

  const switchNavClass = () => {
    const { pathname } = props.location;
    if (pathname === "/") {
      return "home-header";
    } else if (pathname === "/login" || pathname === "/register") {
      return "hide";
    } else {
      return "";
    }
  };

  return (
    <nav className={`nav ${switchNavClass()}`}>
      <div className="left">
        <img src={logo} alt="BudgetIt logo" />
      </div>
      <div className="right">
        {!user ? (
          <NavLink to="/login" className="link">
            Register
          </NavLink>
        ) : (
          <div className="name">
            <span>
              {first.toUpperCase()}
              {second.toUpperCase()}
            </span>
          </div>
        )}

        {!user ? (
          <NavLink to="/login" className="link">
            Login
          </NavLink>
        ) : (
          <div className="dropdown">
            <i
              className="fas fa-chevron-circle-down"
              onClick={handleToggle}
            ></i>
            <div className="dropdown-box">
              <div className="item">
                {" "}
                <Link to="/dashboard/create-budget" className="links">
                  <i className="fas fa-plus"></i> New budget{" "}
                </Link>{" "}
              </div>

              <div className="item">
                <Link to="/dashboard" className="links">
                  <i className="far fa-bookmark"></i> Library{" "}
                </Link>
              </div>
              <div className="item" onClick={logOut}>
                <i className="fas fa-power-off"></i>Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default withRouter(Nav);
