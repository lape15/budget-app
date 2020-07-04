import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import logo from "../../assets/budget-it.png";

import { currency } from "./currency";

import { TimelineLite, Power3 } from "gsap";
const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    currency: "NGN",
  });
  let auth = useRef(null);
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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="auth" ref={(el) => (auth = el)}>
      <div className="side">
        <img src={logo} alt="BudgetIt logo" />

        <h3 className="text-1">Your free account is only 2 seconds away</h3>
        <div className="text1">
          <em> Budget your spending...</em>
        </div>
        <div className="text2">
          <em>Budgeting never felt so good...</em>
        </div>
      </div>
      <div className="reg-form">
        <form onSubmit={handleRegSubmit}>
          <div className="w-40">
            <label className="name">First name</label>
            <input
              type="text"
              value={user.firstname}
              name="firstname"
              onChange={handleChange}
            />
          </div>
          <div className="w-40">
            <label className="last-name">Last name</label>
            <input
              type="text"
              value={user.lastname}
              onChange={handleChange}
              name="lastname"
            />
          </div>
          <div className="w-80">
            <label className="email">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="w-80">
            <label className="password">Password</label>
            <input
              type="password"
              value={user.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <div className="w-80">
            <label className="conPassword">Confirm password</label>
            <input
              type="password"
              value={user.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
          <div className="w-80">
            <label className="cur">Currency</label>
            <select
              value={user.currency}
              name="currency"
              onChange={handleChange}
              onBlur={handleChange}
            >
              {currency.map((cur, index) => {
                return (
                  <option value={cur.cc} key={index}>
                    {cur.name} {cur.symbol}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-80">
            <button>Create your free account</button>
          </div>
          <div className="w-80 back">
            {" "}
            Have an account already? Go to{" "}
            <Link to="/" className="link">
              Login
            </Link>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
