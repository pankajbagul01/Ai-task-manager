import React from 'react';
import { Sparkles } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Sparkles className="logo-icon" size={20} />
          <span className="logo-text text-gradient">Ai task manager</span>
        </div>
        <p className="footer-copy text-secondary">&copy; {new Date().getFullYear()} Ai task manager. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
