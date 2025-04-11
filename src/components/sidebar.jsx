// src/components/Sidebar.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaRocket, FaCogs, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import './sidebar.css';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  // Ref to keep track of the scrollable container
  const scrollContainerRef = useRef(null);
 
  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome size={20} /> },
    { id: 'about', label: 'About', icon: <FaUser size={20} /> },
    { id: 'workexperience', label: 'Work experience', icon: <FaBriefcase size={20} /> },
    { id: 'education', label: 'Education', icon: <FaBriefcase size={20} /> },
    { id: 'voluntary', label: 'Voluntary work', icon: <FaRocket size={20} /> },
    { id: 'skills', label: 'Skills', icon: <FaCogs size={20} /> },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope size={20} /> },
  ];

  // Find and store the scrollable container
  useEffect(() => {
    // First try to find the main-content element
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      scrollContainerRef.current = mainContent;
    } else {
      // Fallback to document.documentElement (the <html> element)
      scrollContainerRef.current = document.documentElement;
    }
    
    // Call handleScroll once to set initial active section
    handleScroll();
  }, []);
  
  // Smooth scroll to section when clicking on nav item
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };
  
  // Handle scroll event to update active section
  const handleScroll = () => {
    // Get the scrollable element's scroll position
    const scrollElement = scrollContainerRef.current;
    if (!scrollElement) return;
    
    // Get scroll position
    const scrollPosition = scrollElement === document.documentElement 
      ? window.scrollY 
      : scrollElement.scrollTop;
    
    // Calculate which section is in view
    // Start from the bottom sections and work up for better accuracy when scrolling down
    for (let i = navItems.length - 1; i >= 0; i--) {
      const section = navItems[i].id;
      const element = document.getElementById(section);
      
      if (element) {
        // Get element's position relative to the viewport
        const rect = element.getBoundingClientRect();
        
        // Adjust the top position based on scroll container
        const topPosition = scrollElement === document.documentElement
          ? rect.top + window.scrollY
          : rect.top + scrollElement.scrollTop;
        
        // Check if we've scrolled past the top of this section
        if (scrollPosition >= topPosition - 150) {
          if (activeSection !== section) {
            setActiveSection(section);
          }
          break;
        }
      }
    }
  };
  
  // Set up scroll event listener
  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (!scrollElement) return;
    
    // Determine which element to listen to
    const target = scrollElement === document.documentElement ? window : scrollElement;
    
    // Add event listener
    target.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]); // Re-attach when activeSection changes to avoid stale closures

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