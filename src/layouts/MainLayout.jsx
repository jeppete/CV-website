// src/layouts/MainLayout.jsx
import Sidebar from '../components/sidebar';

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-20 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;