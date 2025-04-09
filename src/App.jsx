// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </Router>
  );
}

export default App;