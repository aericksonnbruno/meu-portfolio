import React from "react";
import profilePhoto from "../assets/profile-aerickson.jpg";

const tools = ["Excel", "Power BI", "Python", "Java", "SQL"];

const focusAreas = [
  "Production Planning & Control (PPC)",
  "ERP System Development",
  "Maintenance & Manufacturing Work Orders",
  "Shop-Floor Operations",
  "Production-Hour Tracking",
  "Operational Data & KPIs",
];

const managementAndImprovement = [
  "Logistics Management",
  "Lean Six Sigma / Green Belt Fundamentals",
  "Continuous Improvement",
];

const About = () => {
  return (
    <section id="about" className="section-container section-block">
      <div className="section-heading">
        <p className="eyebrow">A LITTLE ABOUT ME</p>
        <h2>
          About <span className="accent-text">me</span>
        </h2>
      </div>

      <div className="about-grid">
        <figure className="profile-photo-card">
          <img
            src={profilePhoto}
            alt="Aerickson Bruno"
            className="profile-photo"
          />
          <figcaption>
            <span className="status-dot" />
            Production Engineering · Curitiba, Brazil
          </figcaption>
        </figure>

        <div className="section-copy">
          <p>
            I am a <strong>Production Engineering Trainee</strong> at{" "}
            <strong>Serra da Prada</strong>, based in Curitiba, Brazil. I support
            maintenance and manufacturing work orders while developing an ERP
            system for the company.
          </p>
          <p>
            I also help track working hours across factory-floor departments and
            follow daily production activities. This hands-on experience helps
            me connect production planning, operational data, and manufacturing
            routines.
          </p>
          <p>
            I am interested in using technology, data analysis, logistics
            knowledge, and continuous improvement to organize information,
            support better decisions, and improve production visibility.
          </p>

          <div className="tools-block">
            <h3>Tools & Technologies</h3>
            <div className="tool-tags">
              {tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>

          <div className="tools-block">
            <h3>Management & Continuous Improvement</h3>
            <div className="tool-tags">
              {managementAndImprovement.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <aside className="focus-panel">
          <h3>Areas of Focus</h3>
          <ul className="focus-list">
            {focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default About;
