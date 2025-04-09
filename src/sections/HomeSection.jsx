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
        <h1 className="text-5xl font-bold mb-4">Jeppe Thy</h1>
        <h2 className="text-2xl text-gray-600 mb-6">Cyber security student</h2>
        <p className="text-lg mb-8">
          Welcome to my resumé website! This is a hobby project that is created using these tools: 
        </p>
      </motion.div>
    </section>
  );
}

export default HomeSection;