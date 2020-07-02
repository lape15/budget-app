import React from "react";
import { ReactComponent as ReactLogo } from "../assets/lady (1).svg";
const Landing = () => {
  return (
    <div className="home">
      <div className="left">
        <h2>Spend Less. </h2>
        <h2>Save More.</h2>
        <span>
          A practical app to help,manage your spending,and also help you save
          more..{" "}
        </span>
      </div>
      <div className="right">
        <ReactLogo />
      </div>
    </div>
  );
};

export default Landing;
