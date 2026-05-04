import React from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className={styles.badge}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your Civic Journey Starts Here
          </motion.span>
          <h1 className={styles.title}>
            Master the <span className={styles.highlight}>Election Process</span> with AI Precision.
          </h1>
          <p className={styles.description}>
            Understand every phase, from nomination to results. Empower yourself with real-time guidance and interactive timelines.
          </p>
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Get Started</button>
            <button className={styles.secondaryBtn}>Explore Timeline</button>
          </div>
        </motion.div>
      </div>
      <div className={styles.visuals}>
        <div className={styles.glow} />
      </div>
    </section>
  );
};

export default Hero;
