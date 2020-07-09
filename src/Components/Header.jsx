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
        <NavLink to="/login" className="link">
          Login
        </NavLink>
        <NavLink to="/register" className="link">
          Register
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
