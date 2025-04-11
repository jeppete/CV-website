// src/sections/HomeSection.jsx
import { motion } from 'framer-motion';

function HomeSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center p-8 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl relative grid grid-cols-2 gap-4 z-10"
      >
        <div className='top-50 relative'>
        <h1 className="text-5xl font-bold mb-4">Jeppe Thy</h1>
        <h2 className="text-2xl text-gray-600 mb-6">Cyber security student</h2>
        <p className="text-lg mb-8 z-100 ">
          Welcome to my resumé website! This is a hobby project that is created using React, Vite and Tailwind. 
        </p>
        </div>
        <div>
        <img class="max-w-full shadow-xl dark:shadow-gray-800" src="/Jeppe-ferdig.jpg" alt="image description" />
        </div>
      </motion.div>
      <img class='absolute z-0 left-200 top-[-10]' src='/mystical-network-glow-stockcake.jpg'/>
    </section>
  );
}

export default HomeSection;