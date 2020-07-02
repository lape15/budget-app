import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div className="left">
        <svg width="100" height="100">
          <circle
            cx="52"
            cy="40"
            r="39"
            style={{ fill: "#F9B500", stroke: "#fff", strokeWidth: 1 }}
          />

          <text
            x="3"
            y="15"
            fill="#000"
            transform="translate(17,30)"
            style={{
              letterSpacing: "1px",
              fontWeight: "800",
              fontSize: "14px",
              fontFamily: "Roboto sans-serif",
            }}
          >
            BudgetIt
          </text>
        </svg>
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
