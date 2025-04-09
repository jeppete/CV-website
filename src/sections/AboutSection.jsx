// src/sections/AboutSection.jsx
import { motion } from 'framer-motion';

function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center p-8 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              I'm a frontend developer with a passion for creating intuitive, dynamic user experiences.
              My journey in web development started in 2020, and I've been building and learning ever since.
            </p>
            <p className="text-lg mb-4">
              I specialize in React and modern JavaScript, with a focus on creating performant, 
              accessible, and visually appealing web applications.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Quick Facts</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-24 font-medium">Location:</span>
                <span>Your City, Country</span>
              </li>
              <li className="flex items-center">
                <span className="w-24 font-medium">Education:</span>
                <span>Your Degree</span>
              </li>
              <li className="flex items-center">
                <span className="w-24 font-medium">Languages:</span>
                <span>English, etc.</span>
              </li>
              <li className="flex items-center">
                <span className="w-24 font-medium">Interests:</span>
                <span>Coding, Design, etc.</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;