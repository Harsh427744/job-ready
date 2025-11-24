import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav>
      <div>
        <div className="flex" style={{ alignItems: 'center' }}>
          <Link to="/" className="logo">⚡ Job Ready</Link>
          
          {isAuthenticated && (
            <div className="space-x" style={{ marginLeft: '2.5rem' }}>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/questions">Questions</Link>
            </div>
          )}
        </div>
        
        <div className="flex" style={{ alignItems: 'center' }}>
          <button 
            onClick={toggleDarkMode} 
            className="theme-toggle"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          {isAuthenticated ? (
            <div className="flex" style={{ alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                Hi, {user?.name}
              </span>
              <button onClick={logout} className="btn-primary">
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x">
              <Link to="/login">Login</Link>
              <Link to="/register">
                <button className="btn-primary">Sign Up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
