// src/sections/SkillsSection.jsx
import { motion } from 'framer-motion';
import '../styles/sections.css';

function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3/SASS", "Tailwind CSS"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "REST APIs", "MongoDB", "PostgreSQL"]
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Webpack", "Vite", "Jest", "CI/CD", "Figma", "Responsive Design"]
    }
  ];

  return (
    <section id="skills" className="section section-light">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-container"
      >
        <h2 className="section-title">Skills</h2>
        
        <div className="skills-categories">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="skills-category"
            >
              <h3 className="skills-category-title">{category.title}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, i) => (
                  <div key={i} className="skill-item">
                    <div className="skill-dot"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Optional: Add a skill bars section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="proficiency-section"
        >
          <h3 className="proficiency-title">Proficiency</h3>
          <div className="proficiency-items">
            {[
              { skill: "React", level: 90 },
              { skill: "JavaScript", level: 85 },
              { skill: "CSS/Tailwind", level: 80 },
              { skill: "Node.js", level: 70 },
              { skill: "TypeScript", level: 75 }
            ].map((item, i) => (
              <div key={i} className="proficiency-item">
                <div className="proficiency-header">
                  <span>{item.skill}</span>
                  <span>{item.level}%</span>
                </div>
                <div className="proficiency-bar-bg">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1 * i }}
                    className="proficiency-bar-fill"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default SkillsSection;