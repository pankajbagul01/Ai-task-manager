import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Zap, CheckCircle2 } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const scrollToApp = () => {
    document.getElementById('app-workspace').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>
      
      <div className="hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-pill hero-badge"
        >
          <span role="img" aria-label="sparkles">✨</span> Powered by Gemini AI
        </motion.div>
        
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Manage tasks at the <br />
          <span className="text-gradient">speed of thought.</span>
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle text-secondary"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Just tell the AI what you need to do, and watch your dashboard organize itself seamlessly. Built exclusively for modern workflows.
        </motion.p>
        
        <motion.button 
          onClick={scrollToApp} 
          className="hero-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Start Managing Now
        </motion.button>

        <motion.div 
          className="features-preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="feature">
            <Bot className="feature-icon text-gradient" />
            <span>AI Parsing</span>
          </div>
          <div className="feature">
            <Zap className="feature-icon text-gradient" />
            <span>Real-time</span>
          </div>
          <div className="feature">
            <CheckCircle2 className="feature-icon text-gradient" />
            <span>Kanban Ready</span>
          </div>
        </motion.div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span className="text-secondary">Scroll down to App</span>
      </div>
    </section>
  );
};

export default Hero;
