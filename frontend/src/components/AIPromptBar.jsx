import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import './AIPromptBar.css';

const AIPromptBar = ({ onTaskAdded }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ai/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to process prompt');
      }

      setPrompt('');
      onTaskAdded(); // Refresh task list
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard shortcut (Cmd/Ctrl + K to focus)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="prompt-bar-container">
      {error && <div className="prompt-error glass-panel">{error}</div>}
      <form className="prompt-bar glass-panel" onSubmit={handleSubmit}>
        <div className="prompt-icon">
          {loading ? <Loader2 className="spinner icon-active" size={24} /> : <Sparkles className="icon-active" size={24} />}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Remind me to review design docs tomorrow at high priority... (Ctrl+K)"
          className="prompt-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          className={`prompt-submit ${prompt.trim() && !loading ? 'active' : ''}`}
          disabled={!prompt.trim() || loading}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default AIPromptBar;
