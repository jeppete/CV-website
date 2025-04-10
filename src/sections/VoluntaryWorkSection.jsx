// src/sections/VoluntaryWorkSection.jsx
import { motion } from 'framer-motion';
import '../styles/sections.css';

function VoluntaryWorkSection() {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Company Name",
      period: "2023 - Present",
      description: "Led the development of the company's main product using React and TypeScript. Implemented new features, improved performance, and mentored junior developers."
    },
    {
      title: "Frontend Developer",
      company: "Previous Company",
      period: "2020 - 2023",
      description: "Developed and maintained multiple web applications with React. Collaborated with designers and backend engineers to deliver high-quality products."
    },
    {
      title: "Web Developer Intern",
      company: "Internship Company",
      period: "2019 - 2020",
      description: "Assisted in the development of various web projects. Gained experience with HTML, CSS, JavaScript, and modern frameworks."
    },
    {
      title: "Web Developer Intern",
      company: "Internship Company",
      period: "2019 - 2020",
      description: "Assisted in the development of various web projects. Gained experience with HTML, CSS, JavaScript, and modern frameworks."
    },
    {
      title: "Web Developer Intern",
      company: "Internship Company",
      period: "2019 - 2020",
      description: "Assisted in the development of various web projects. Gained experience with HTML, CSS, JavaScript, and modern frameworks."
    }
  ];

  return (
    <section id="voluntary" className="section">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-container"
      >
        <h2 className="section-title">Experience</h2>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="experience-item"
            >
              <div className="experience-dot" />
              <div className="experience-card">
                <h3 className="experience-title">{exp.title}</h3>
                <div className="experience-subtitle">
                  <p className="experience-company">{exp.company}</p>
                  <p className="experience-period">{exp.period}</p>
                </div>
                <p>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default VoluntaryWorkSection;