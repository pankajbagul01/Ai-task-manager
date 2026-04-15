import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  return (
    <section id="pricing" className="pricing-section">
      <div className="section-header">
        <h2 className="section-title">Simple Pricing</h2>
        <p className="section-subtitle text-secondary">
          Get started for free, upgrade when you need real horsepower.
        </p>
      </div>

      <div className="pricing-container">
        {/* Basic Tier */}
        <motion.div 
          className="pricing-card glass-panel"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="pricing-header">
            <h3>Starter</h3>
            <div className="price"><span>$0</span>/mo</div>
          </div>
          <ul className="pricing-features">
            <li><Check size={18} className="text-secondary" /> Up to 50 active tasks</li>
            <li><Check size={18} className="text-secondary" /> Standard AI Processing</li>
            <li><Check size={18} className="text-secondary" /> Local Storage</li>
          </ul>
          <button className="pricing-cta variant-outline">Current Plan</button>
        </motion.div>

        {/* Pro Tier */}
        <motion.div 
          className="pricing-card glass-panel featured"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="popular-badge">Most Popular</div>
          <div className="pricing-header">
            <h3>Pro</h3>
            <div className="price"><span>$9</span>/mo</div>
          </div>
          <ul className="pricing-features">
            <li><Check size={18} className="text-accent" /> Unlimited active tasks</li>
            <li><Check size={18} className="text-accent" /> Advanced AI logic context</li>
            <li><Check size={18} className="text-accent" /> Cloud sync capability</li>
            <li><Check size={18} className="text-accent" /> Priority Support</li>
          </ul>
          <button className="pricing-cta">Upgrade to Pro</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
