import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const savedTheme = window.localStorage.getItem('countries-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('countries-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-shell">
      <Navbar
        toggleTheme={toggleTheme}
        currentTheme={theme}
        onBrandClick={scrollToTop}
      />
      <main className="page-shell">
        <Outlet />
      </main>
      <button
        type="button"
        className={`scroll-top-button ${showScrollTop ? 'is-visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll smoothly to the top"
      >
        <svg viewBox="0 0 24 24" className="scroll-top-button__icon" aria-hidden="true">
          <path
            d="M12 5.5 5.5 12m6.5-6.5 6.5 6.5M12 6v12.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Top</span>
      </button>
    </div>
  );
}

export default App;
