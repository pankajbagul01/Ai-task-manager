import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import AIPromptBar from './components/AIPromptBar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const refreshTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      if (!res.ok) throw new Error('API down');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.warn("Failed to fetch tasks...");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Auth onLogin={(userData) => { setUser(userData); navigate('/'); }} />} />
      <Route path="/*" element={
        <div className="website-wrapper">
          <Navbar />
          <Hero />
          <Features />
          <Pricing />
          
          <div id="app-workspace" className="dashboard-wrapper">
            <Sidebar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <main className="main-content">
              <div className="scrollable-routes">
                <Routes>
                  <Route path="/" element={<Dashboard tasks={tasks} loading={loading} />} />
                  <Route path="/tasks" element={<TaskManager tasks={tasks} refreshTasks={refreshTasks} loading={loading} />} />
                </Routes>
              </div>
              <div className="prompt-bar-wrapper">
                <AIPromptBar onTaskAdded={refreshTasks} />
              </div>
            </main>
          </div>

          <Footer />
        </div>
      } />
    </Routes>
  );
}

export default App;
