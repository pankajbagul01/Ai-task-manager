import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
  <motion.div 
    className={`stat-card glass-panel ${colorClass}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    <div className="stat-header">
      <h3 className="stat-title">{title}</h3>
      <div className="stat-icon"><Icon size={24} /></div>
    </div>
    <div className="stat-value">{value}</div>
  </motion.div>
);

const Dashboard = ({ tasks, loading }) => {
  const pending = tasks.filter(t => t.status === 'pending').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const highPriority = tasks.filter(t => t.priority === 'high').length;

  return (
    <div className="dashboard animate-fade-in">
      <header className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle text-secondary">Here is what's happening with your tasks today.</p>
      </header>

      <div className="stats-grid">
        <StatCard title="Pending" value={pending} icon={Clock} colorClass="amber" delay={0.1} />
        <StatCard title="In Progress" value={inProgress} icon={TrendingUp} colorClass="blue" delay={0.2} />
        <StatCard title="Completed" value={completed} icon={CheckCircle} colorClass="emerald" delay={0.3} />
        <StatCard title="High Priority" value={highPriority} icon={AlertCircle} colorClass="red" delay={0.4} />
      </div>

      <div className="recent-activity-section">
        <h2 className="section-title">Recent Tasks</h2>
        {loading ? (
          <p className="text-secondary">Loading tasks...</p>
        ) : (
          <div className="activity-list">
            {tasks.slice(0, 5).map(task => (
              <div key={task._id} className="activity-item glass-panel">
                <div className={`status-indicator ${task.status}`}></div>
                <div className="activity-details">
                  <h4>{task.title}</h4>
                  <span className="glass-pill">{task.priority}</span>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="empty-state">No tasks created yet. Try asking the AI bot below!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
