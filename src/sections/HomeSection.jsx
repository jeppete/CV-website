// src/sections/HomeSection.jsx
import { motion } from 'framer-motion';
import '../styles/sections.css';

function HomeSection() {
  return (
    <section id="home" className="section"> 
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-container"
      >
        <h1 className="home-title">Jeppe Thy</h1>
        <h2 className="home-subtitle">Cyber security student</h2>
        <p className="home-paragraph">
          Welcome to my resumé website! This is a hobby project that is created using these tools: 
        </p>
      </motion.div>
    </section>
  );
}

export default HomeSection;