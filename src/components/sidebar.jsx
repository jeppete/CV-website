// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaRocket, FaCogs, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome size={20} /> },
    { id: 'about', label: 'About', icon: <FaUser size={20} /> },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase size={20} /> },
    { id: 'projects', label: 'Projects', icon: <FaRocket size={20} /> },
    { id: 'skills', label: 'Skills', icon: <FaCogs size={20} /> },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope size={20} /> },
  ];

  // Smooth scroll to section when clicking on nav item
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`bg-gray-800 text-white h-screen fixed left-0 top-0 p-4 transition-all duration-300 z-10
                 ${isExpanded ? 'w-64' : 'w-20'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`mb-8 overflow-hidden ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <h2 className="text-xl font-bold truncate">Your Name</h2>
        <p className="text-gray-400 truncate">Frontend Developer</p>
      </div>
      
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <button 
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center p-3 rounded-lg transition-colors w-full text-left ${
                activeSection === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="inline-flex justify-center items-center w-6">{item.icon}</span>
              
              <span className={`ml-3 truncate ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'} transition-all duration-300`}>
                {item.label}
              </span>
              
              {activeSection === item.id && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className={`flex ${isExpanded ? 'space-x-4' : 'flex-col space-y-4'} text-gray-400`}>
          <a href="https://github.com/jeppete" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/jeppe-thy" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;