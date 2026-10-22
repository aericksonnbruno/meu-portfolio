import React from "react";

const NavBar = () => {
  return (
    <header className="site-header">
      <nav className="nav-container" aria-label="Main navigation">
        <a className="brand" href="#intro" aria-label="Aerickson home">
          Aerickson<span>.</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a
            className="nav-github"
            href="https://github.com/aericksonnbruno"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
