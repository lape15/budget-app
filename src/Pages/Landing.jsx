import React, { useEffect, useRef } from "react";

import { ReactComponent as ReactLogo } from "../assets/landing-image.svg";

import { TimelineLite, Power3 } from "gsap";

const Landing = () => {
  let home = useRef(null);
  let tl = new TimelineLite({ delay: 0.8 });

  useEffect(() => {
    tl.from(".lady", 3, { y: 1280, ease: Power3.easeOut }, "Start");

    tl.staggerFrom(
      ".word",
      1,
      {
        y: 56,
        ease: Power3.easeOut,
        delay: 0.8,
        opacity: 0,
      },
      0.15,
      "Start"
    )
      .from(".content", 1, { y: 20, opacity: 0, ease: Power3.easeOut }, 1.4)
      .from(".btn-box", 1, { y: 20, opacity: 0, ease: Power3.easeOut }, 1.4);
  });

  return (
    <div className="home" ref={(el) => (home = el)}>
      <div className="left">
        <h2>
          <div className="line">
            <div className="word">Budget It.</div>
          </div>
          <div className="line">
            <div className="word"> Spend Less.</div>
          </div>
          <div className="line">
            <div className="word"> Save More.</div>
          </div>
        </h2>
        <span className="content">
          {" "}
          A practical app to track your spending and help you save more...
        </span>

        <div className="btn-box">
          <button>Register now</button>
        </div>
      </div>
      <div className="right">
        <ReactLogo />
      </div>
    </div>
  );
};

export default Landing;
