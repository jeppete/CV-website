import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: '👤' },
    { path: '/experience', label: 'Experience', icon: '💼' },
    { path: '/projects', label: 'Projects', icon: '🚀' },
    { path: '/skills', label: 'Skills', icon: '🔧' },
    { path: '/contact', label: 'Contact', icon: '✉️' },
  ];

  return (
    <nav className="bg-gray-800 text-white h-screen w-64 fixed left-0 top-0 p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Your Name</h2>
        <p className="text-gray-400">Frontend Developer</p>
      </div>
      
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className={`flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
              
              {location.pathname === item.path && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="absolute bottom-8 left-4 right-4">
        <div className="flex space-x-4 justify-center text-gray-400">
          {/* Social icons */}
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            GH
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            LI
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;