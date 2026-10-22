import React from "react";

const experiences = [
  {
    role: "Production Engineering Trainee",
    company: "Serra da Prada",
    location: "Curitiba, Brazil",
    period: "June 2026 – Present",
    current: true,
    bullets: [
      "Developing an ERP system to support the organization and management of company information.",
      "Tracking maintenance and manufacturing work orders and supporting their follow-up.",
      "Helping record working hours across factory-floor departments to improve production visibility.",
      "Working directly on the factory floor to learn manufacturing processes and daily operations.",
      "Supporting Production Planning and Control (PPC) activities.",
    ],
  },
  {
    role: "Operations Assistant",
    company: "PH Recursos Humanos (contractor for Correios)",
    location: "Brazil",
    period: "June 2024 – August 2025",
    current: false,
    bullets: [
      "Unloaded trailers and supplied production lines using forklifts and pallet jacks.",
      "Used data-collection scanners and internal Correios systems to check, track, and organize cargo.",
      "Supported FNDE operations by receiving, sorting, and separating textbooks for school distribution.",
    ],
  },
  {
    role: "Production and Quality Apprentice",
    company: "Electrolux",
    location: "Brazil",
    period: "February 2020 – April 2021",
    current: false,
    bullets: [
      "Sorted and organized materials in the pre-assembly area for household appliances.",
      "Performed visual inspections of finished products, identified damage, and routed items for reconditioning.",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-container section-block">
      <div className="section-heading">
        <p className="eyebrow">MY PROFESSIONAL JOURNEY</p>
        <h2>Experience</h2>
      </div>
      <div className="experience-timeline">
        {experiences.map((experience) => (
          <article className="experience-card" key={`${experience.company}-${experience.role}`}>
            <div className="experience-marker" aria-hidden="true"><span /></div>
            <div className="experience-main">
              <div className="experience-header">
                <div>
                  <h3>{experience.role}</h3>
                  <p className="experience-company">
                    {experience.company} <span>· {experience.location}</span>
                  </p>
                </div>
                {experience.current && <span className="current-label">Current role</span>}
              </div>
              <p className="experience-period">{experience.period}</p>
              <ul className="responsibility-list">
                {experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
