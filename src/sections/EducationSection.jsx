import { motion } from 'framer-motion';
import '../styles/sections.css';

function EducationSection() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-featured online store built with React, Node.js, and MongoDB.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      link: "#"
    },
    {
      title: "Task Management App",
      description: "A productivity tool for teams to manage projects and track progress.",
      tags: ["React", "Firebase", "Tailwind CSS"],
      link: "#"
    },
    {
      title: "Portfolio Website",
      description: "A personal website to showcase projects and skills (this site).",
      tags: ["React", "Framer Motion", "Tailwind CSS"],
      link: "#"
    }
  ];

  return (
    <section id="education" className="section section-light">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-container section-container-wide"
      >
        <h2 className="section-title">Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="project-card"
            >
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
              </div>
              <div className="project-content">
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  className="project-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Project →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default EducationSection;