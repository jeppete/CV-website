// src/sections/AboutSection.jsx
import { motion } from 'framer-motion';
import '../styles/sections.css';

function AboutSection() {
  return (
    <section id="about" className="section section-light">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-container"
      >
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div>
            <p className="about-text">
              I'm a frontend developer with a passion for creating intuitive, dynamic user experiences.
              My journey in web development started in 2020, and I've been building and learning ever since.
            </p>
            <p className="about-text">
              I specialize in React and modern JavaScript, with a focus on creating performant, 
              accessible, and visually appealing web applications.
            </p>
          </div>
          <div className="about-card">
            <h3 className="about-card-title">Quick Facts</h3>
            <ul className="about-list">
              <li className="about-list-item">
                <span className="about-list-label">Location:</span>
                <span>Your City, Country</span>
              </li>
              <li className="about-list-item">
                <span className="about-list-label">Education:</span>
                <span>Your Degree</span>
              </li>
              <li className="about-list-item">
                <span className="about-list-label">Languages:</span>
                <span>English, etc.</span>
              </li>
              <li className="about-list-item">
                <span className="about-list-label">Interests:</span>
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