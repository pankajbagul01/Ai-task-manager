import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import './TaskManager.css';

const TaskManager = ({ tasks, refreshTasks, loading }) => {
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      refreshTasks();
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      refreshTasks();
    } catch (err) {
      console.error("Failed to delete");
    }
  };

  return (
    <div className="task-manager animate-fade-in">
      <header className="page-header">
        <h1 className="page-title">Tasks</h1>
        <p className="page-subtitle text-secondary">Manage your AI-generated tasks and reminders.</p>
      </header>

      {loading ? (
        <div className="loading-state text-secondary">Loading tasks...</div>
      ) : (
        <div className="task-list">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div 
                key={task._id} 
                className={`task-card glass-panel priority-${task.priority}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <div className="task-header">
                  <h3 className={task.status === 'completed' ? 'completed-text' : ''}>{task.title}</h3>
                  <div className="task-actions">
                    <button 
                      className={`icon-btn ${task.status === 'completed' ? 'active' : ''}`}
                      onClick={() => handleStatusChange(task._id, task.status === 'completed' ? 'pending' : 'completed')}
                      title="Toggle Complete"
                    >
                      <Check size={18} />
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDelete(task._id)} title="Delete Task">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                {task.description && <p className="task-desc text-secondary">{task.description}</p>}
                
                <div className="task-meta">
                  {task.dueDate && (
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                    </div>
                  )}
                  <div className="meta-item">
                    <Clock size={14} />
                    <span>Created: {format(new Date(task.createdAt), 'MMM d, h:mm a')}</span>
                  </div>
                  <span className={`status-badge ${task.status}`}>{task.status}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {tasks.length === 0 && (
            <div className="empty-state">
              <p>You have no tasks! Start typing below in the AI prompt bar to generate some.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskManager;
