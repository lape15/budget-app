import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/budget-it.png";

const Header = () => {
  return (
    <header>
      <div className="left">
        <NavLink to="/">
          <img src={logo} alt="BudgetIt logo" />
        </NavLink>
      </div>
      <div className="right">
        <NavLink to="/" className="link">
          Login
        </NavLink>
        <NavLink to="/" className="link">
          Register
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
