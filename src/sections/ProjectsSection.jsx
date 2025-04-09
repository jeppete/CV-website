// src/sections/ProjectsSection.jsx
import { motion } from 'framer-motion';

function ProjectsSection() {
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
    <section id="projects" className="min-h-screen flex items-center p-8 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto w-full"
      >
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              <div className="p-5">
                <p className="mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  className="text-blue-600 font-medium hover:underline"
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

export default ProjectsSection;