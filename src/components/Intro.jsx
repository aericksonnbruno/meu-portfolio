import React from "react";
import { TypeAnimation } from "react-type-animation";
import InteractiveReducer from "./InteractiveReducer";

const Intro = () => {
  return (
    <section id="intro" className="hero section-container">
      <div className="hero-content">
        <p className="eyebrow">PRODUCTION ENGINEERING · OPERATIONS · TECHNOLOGY</p>
        <h1 className="hero-title">
          Hi, I’m{" "}
          <span className="accent-text hero-animated-name">
            <TypeAnimation
              sequence={["Aerickson."]}
              wrapper="span"
              speed={48}
              cursor={false}
              repeat={0}
            />
            <span className="hero-cursor" aria-hidden="true">|</span>
          </span>
        </h1>
        <h2>Production Engineering Trainee based in Curitiba, Brazil.</h2>
        <p className="hero-description">
          At Serra da Prada, I’m developing an ERP system and supporting
          Production Planning and Control (PPC). I also work directly on the
          factory floor, helping track maintenance and manufacturing work
          orders and record working hours across production areas.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore my projects <span aria-hidden="true">↓</span>
          </a>
          <a
            className="button button-secondary"
            href="https://github.com/aericksonnbruno"
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub ↗
          </a>
        </div>
      </div>
      <InteractiveReducer />
    </section>
  );
};

export default Intro;
