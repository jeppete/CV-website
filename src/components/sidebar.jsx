// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaRocket, FaCogs, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import './sidebar.css';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome size={20} /> },
    { id: 'about', label: 'About', icon: <FaUser size={20} /> },
    { id: 'workexperience', label: 'Work experience', icon: <FaBriefcase size={20} /> },
    { id: 'education', label: 'Education', icon: <FaBriefcase size={20} /> },
    { id: 'voluntary', label: 'Voluntary work', icon: <FaRocket size={20} /> },
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
      className={`sidebar ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`header ${isExpanded ? 'header-visible' : 'header-hidden'}`}>
        <h2 className="text-xl font-bold truncate">Jeppe Thy</h2>
        <p className="text-gray-600 truncate">Cyber security student</p>
      </div>
      
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.id}>
            <button 
              onClick={() => scrollToSection(item.id)}
              className={`nav-button ${
                activeSection === item.id 
                  ? 'nav-button-active' 
                  : 'nav-button-inactive'
              }`}
            >
              <span className="icon-container">{item.icon}</span>
              
              <span className={`label ${isExpanded ? 'label-visible' : 'label-hidden'}`}>
                {item.label}
              </span>
              
              {activeSection === item.id && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="indicator"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
      
      <div className="social-container">
        <div className={`social-icons ${isExpanded ? 'social-icons-expanded' : 'social-icons-collapsed'}`}>
          <a href="https://github.com/jeppete" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/jeppe-thy" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;