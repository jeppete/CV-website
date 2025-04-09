// src/layouts/MainLayout.jsx
import Sidebar from '../components/sidebar';
import './MainLayout.css';

function MainLayout({ children }) {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;