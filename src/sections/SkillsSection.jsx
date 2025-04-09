// src/sections/SkillsSection.jsx
import { motion } from 'framer-motion';

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
    <section id="skills" className="min-h-screen flex items-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto w-full"
      >
        <h2 className="text-3xl font-bold mb-8">Skills</h2>
        
        <div className="space-y-8">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {category.skills.map((skill, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
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
          className="mt-12"
        >
          <h3 className="text-xl font-semibold mb-4">Proficiency</h3>
          <div className="space-y-4">
            {[
              { skill: "React", level: 90 },
              { skill: "JavaScript", level: 85 },
              { skill: "CSS/Tailwind", level: 80 },
              { skill: "Node.js", level: 70 },
              { skill: "TypeScript", level: 75 }
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <span>{item.skill}</span>
                  <span>{item.level}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1 * i }}
                    className="h-full bg-blue-600 rounded-full"
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