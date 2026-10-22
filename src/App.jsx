import React from "react";
import NavBar from "./components/NavBar";
import Intro from "./components/Intro";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Credits from "./components/Credits";
import "./styles/Portfolio.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Intro />
        <About />
        <Experience />
        <Projects />
      </main>
      <Credits />
    </div>
  );
}

export default App;
