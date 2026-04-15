import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';
import './Auth.css';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth success
    if (email && password) {
      onLogin({ email, name: isLogin ? 'User' : name });
    }
  };

  return (
    <div className="auth-container">
      {/* Left Pane - Form */}
      <div className="auth-left-pane">
        <motion.div 
          className="auth-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <Sparkles className="logo-icon hero-icon" size={32} />
            <h2 className="text-gradient">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-secondary">
            {isLogin ? 'Enter your details to access your dashboard.' : 'Sign up to start organizing tasks intelligently.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div 
                className="input-group"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="input-icon"><User size={18} /></div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="input-group">
            <div className="input-icon"><Mail size={18} /></div>
            <input 
              type="email" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <div className="input-icon"><Lock size={18} /></div>
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="auth-submit nav-cta">
            {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
          </button>
        </form>

          <div className="auth-footer">
            <p className="text-secondary">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button className="text-switch" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Pane - Image */}
      <div className="auth-right-pane">
        <div className="auth-image-overlay">
          <h2>Manage your day with AI.</h2>
          <p>Organize, prioritize, and conquer your tasks seamlessly.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
