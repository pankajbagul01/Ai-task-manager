import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Settings, Sparkles, Sun, Moon } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ toggleTheme, isDarkMode }) => {
  return (
    <aside className="sidebar glass-panel">
      <div className="logo-container">
        <Sparkles className="logo-icon" />
        <h1 className="logo-text text-gradient">Ai task manager</h1>
      </div>
      
      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <CheckSquare size={20} />
          <span>Tasks</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <button className="nav-item" onClick={toggleTheme}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
