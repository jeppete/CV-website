import { motion } from 'framer-motion';
import profpicture from '/med.jpg';
import './Home.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function Home() {
  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">404</h1>
        <h2 className="text-2xl text-gray-600 mb-8">brb</h2>
        
        <div>
          <img src={profpicture} className="picture" alt="Jeppe" />
      </div>
        
    
      </div>
    </motion.div>
  );
}

export default Home;