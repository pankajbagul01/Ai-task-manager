import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const scrollToApp = () => {
    document.getElementById('app-workspace').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`site-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <Sparkles className="logo-icon" />
        <span className="logo-text text-gradient">   Ai task manager  </span>
      </div>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
      </div>
      <div className="nav-actions" style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
        <button onClick={handleLogin} style={{background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500}}>
          Log In
        </button>
        <button onClick={scrollToApp} className="nav-cta">
          Launch App
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
