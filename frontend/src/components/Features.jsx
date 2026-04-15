import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layout, Zap, Lock } from 'lucide-react';
import './Features.css';

const featureList = [
  {
    icon: Sparkles,
    title: 'AI Native Prompts',
    description: 'Forget filling out forms. Just tell the AI what you need to do, and it will magically extract the dates, priorities, and descriptions.'
  },
  {
    icon: Layout,
    title: 'Premium Visuals',
    description: 'A beautiful, glassmorphic dark theme designed to reduce eye strain while keeping you focused and immersed.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built on Vite and React, rendering is instantaneous. Your productivity should never be bottlenecked by load times.'
  },
  {
    icon: Lock,
    title: 'Local Privacy',
    description: 'Everything is securely stored locally on your database by default, ensuring full ownership over your tasks.'
  }
];

const Features = () => {
  return (
    <section id="features" className="features-section">
      <div className="section-header">
        <h2 className="section-title">Built for Modern Minds</h2>
        <p className="section-subtitle text-secondary">
          Stop managing your time. Start organizing your thoughts.
        </p>
      </div>

      <div className="features-grid">
        {featureList.map((feature, idx) => (
          <motion.div 
            key={idx}
            className="feature-card glass-panel"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <div className="feature-card-icon">
              <feature.icon size={28} />
            </div>
            <h3>{feature.title}</h3>
            <p className="text-secondary">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
