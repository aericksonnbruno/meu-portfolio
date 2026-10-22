import React from "react";

const projects = [
  {
    number: "01",
    status: "In development",
    title: "ERP System — Serra da Prada",
    description:
      "An ongoing company project focused on developing an ERP system and organizing information to support day-to-day operations.",
    tags: ["ERP", "Operations", "Process Integration"],
  },
  {
    number: "02",
    status: "Ongoing work",
    title: "Production Planning & Control",
    description:
      "Work related to production planning, work-order follow-up, and recording working hours across factory-floor departments.",
    tags: ["PPC", "Manufacturing", "Work Orders"],
  },
  {
    number: "03",
    status: "In development",
    title: "Production & Maintenance Indicators",
    description:
      "A reporting project to organize maintenance and manufacturing work orders, monitor open, stopped, and closed orders, and analyze recorded hours using Power BI and DAX.",
    tags: ["Power BI", "DAX", "Data Analysis"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section-container section-block">
      <div className="section-heading section-heading-row">
        <div>
          <p className="eyebrow">SELECTED WORK</p>
          <h2>Projects</h2>
        </div>
        <a
          className="text-link"
          href="https://github.com/aericksonnbruno"
          target="_blank"
          rel="noopener noreferrer"
        >
          More on GitHub ↗
        </a>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-card-top">
              <span className="project-number">{project.number}</span>
              <span className="project-status"><span className="status-dot" /> {project.status}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </article>
        ))}
      </div>
      <p className="projects-note">
        These descriptions reflect work in progress. Project demos and source-code
        links can be added when they are ready to share publicly.
      </p>
    </section>
  );
};

export default Projects;
