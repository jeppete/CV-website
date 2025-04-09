// src/sections/HomeSection.jsx
import { motion } from 'framer-motion';

function HomeSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl font-bold mb-4">Your Name</h1>
        <h2 className="text-2xl text-gray-600 mb-6">Frontend Developer</h2>
        <p className="text-lg mb-8">
          Welcome to my portfolio. I'm passionate about creating engaging web experiences
          with modern technologies like React and Tailwind CSS.
        </p>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
        >
          Learn More
        </button>
      </motion.div>
    </section>
  );
}

export default HomeSection;