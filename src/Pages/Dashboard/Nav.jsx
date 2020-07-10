import React, { useState } from "react";
import logo from "../../assets/budget-it.png";
import { gsap } from "gsap";
import { Redirect } from "react-router-dom";

const Nav = () => {
  const [toggle, setToggle] = useState(true);
  const [navigate, setNavigate] = useState(false);

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
    setNavigate(true);
  };

  if (navigate) {
    return <Redirect to="/login" push={true} />;
  }

  return (
    <nav className="nav">
      <div className="left">
        {" "}
        <img src={logo} alt="BudgetIt logo" />
      </div>
      <div className="right">
        <div className="name">
          <span>
            {first.toUpperCase()}
            {second.toUpperCase()}
          </span>
        </div>
        <div className="dropdown">
          <i className="fas fa-chevron-circle-down" onClick={handleToggle}></i>
          <div className="dropdown-box">
            <div className="item" onClick={logOut}>
              <i className="fas fa-power-off"></i>Logout
            </div>
            <div className="item">
              <i class="far fa-bookmark"></i> Library
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
