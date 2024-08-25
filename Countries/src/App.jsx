import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`App ${theme}`}>
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;