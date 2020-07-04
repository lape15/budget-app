import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/budget-it.png";
import { currency } from "./currency";
const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    currency: "NGN",
  });

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
    <div className="auth">
      <div className="side">
        <img src={logo} alt="BudgetIt logo" />
        <h3> Enter your details</h3>
        <span> Budget your spending.</span>
        <span>Budgeting never felt so good.</span>
      </div>
      <div className="reg-form">
        <form onSubmit={handleRegSubmit}>
          <label className="name">First name</label>
          <input
            type="text"
            value={user.firstname}
            name="firstname"
            onChange={handleChange}
          />
          <label className="last-name">Last name</label>
          <input
            type="text"
            value={user.lastname}
            onChange={handleChange}
            name="lastname"
          />
          <label className="email">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={handleChange}
            name="email"
          />
          <label className="password">Password</label>
          <input
            type="password"
            value={user.password}
            onChange={handleChange}
            name="password"
          />
          <label className="conPassword">Confirm password</label>
          <input
            type="password"
            value={user.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
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
          <button>Create your free account</button>
          <div className="back">
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
