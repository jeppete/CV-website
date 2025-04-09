// src/sections/ExperienceSection.jsx
import { motion } from 'framer-motion';

function ExperienceSection() {
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
    <section id="experience" className="min-h-screen flex items-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto w-full"
      >
        <h2 className="text-3xl font-bold mb-8">Experience</h2>
        
        <div className="relative border-l-2 border-gray-300 pl-8 ml-4">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 relative"
            >
              <div className="absolute -left-12 w-6 h-6 bg-blue-600 rounded-full border-4 border-white" />
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm bg-gray-100 px-2 py-1 rounded">{exp.period}</p>
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

export default ExperienceSection;