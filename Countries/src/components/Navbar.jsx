import { Link, useLocation, useNavigate } from 'react-router-dom';

import './Navbar.css';

const SunIcon = () => (
  <svg viewBox="0 0 24 24" className="theme-toggle__svg" aria-hidden="true">
    <circle cx="12" cy="12" r="4.25" fill="currentColor" />
    <g
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M12 2.75v2.5" />
      <path d="M12 18.75v2.5" />
      <path d="M21.25 12h-2.5" />
      <path d="M5.25 12h-2.5" />
      <path d="m18.54 5.46-1.77 1.77" />
      <path d="m7.23 16.77-1.77 1.77" />
      <path d="m18.54 18.54-1.77-1.77" />
      <path d="M7.23 7.23 5.46 5.46" />
    </g>
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" className="theme-toggle__svg" aria-hidden="true">
    <path
      d="M15.3 3.35a8.9 8.9 0 1 0 5.35 15.78A9.7 9.7 0 0 1 15.3 3.35Z"
      fill="currentColor"
    />
  </svg>
);

const Navbar = ({ currentTheme, toggleTheme, onBrandClick }) => {
  const nextThemeLabel =
    currentTheme === 'dark' ? 'Day edition' : 'Night edition';
  const location = useLocation();
  const navigate = useNavigate();

  const handleBrandClick = (event) => {
    event.preventDefault();

    if (location.pathname !== '/') {
      navigate('/');
    }

    window.requestAnimationFrame(() => {
      onBrandClick();
    });
  };

  return (
    <header className="site-header">
      <div className="site-header__content">
        <div className="site-header__brand">
          <p className="site-header__eyebrow">Field Edition 2026</p>
          <h1>
            <Link to="/" onClick={handleBrandClick}>
              The World Atlas Desk
            </Link>
          </h1>
          <p className="site-header__strap">
            An editorial registry of nations, capitals and borders.
          </p>
        </div>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${nextThemeLabel.toLowerCase()}`}
        >
          <span className="theme-toggle__icon" aria-hidden="true">
            {currentTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </span>
          <span>{nextThemeLabel}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
