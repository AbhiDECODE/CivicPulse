'use client';

import React, { useState } from 'react';
import styles from './VoterGuide.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronRight, ChevronLeft, MapPin, FileText, Smartphone } from 'lucide-react';

const steps = [
  {
    title: 'Eligibility',
    description: 'Check if you are eligible to vote.',
    content: (
      <div className={styles.stepContent}>
        <ul className={styles.checkList}>
          <li>You must be a citizen of the country.</li>
          <li>You must be 18 years of age or older on the qualifying date.</li>
          <li>You must be an ordinary resident in the constituency.</li>
          <li>You must not be disqualified due to unsound mind or criminal conviction.</li>
        </ul>
      </div>
    )
  },
  {
    title: 'Registration',
    description: 'Ensure your name is on the electoral roll.',
    content: (
      <div className={styles.stepContent}>
        <p>If you are not registered, follow these steps:</p>
        <ul className={styles.checkList}>
          <li>Fill out **Form 6** for new voters.</li>
          <li>Upload identity and address proof.</li>
          <li>Once approved, you will receive your **Voter ID (EPIC)**.</li>
        </ul>
        <div className={styles.infoBox}>
          <Smartphone size={20} />
          <span>You can check your name on the **Voter Portal** or the **Voter Helpline App**.</span>
        </div>
      </div>
    )
  },
  {
    title: 'Preparation',
    description: 'Identify your polling station and date.',
    content: (
      <div className={styles.stepContent}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <MapPin className={styles.cardIcon} />
            <h4>Find your Booth</h4>
            <p>Locate your assigned polling station via the official portal.</p>
          </div>
          <div className={styles.card}>
            <FileText className={styles.cardIcon} />
            <h4>Know your ID</h4>
            <p>Carry your EPIC card or other valid photo IDs like Aadhar, PAN, or Passport.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Voting',
    description: 'Process at the polling station.',
    content: (
      <div className={styles.stepContent}>
        <p>On election day:</p>
        <ol className={styles.numberedList}>
          <li>Identify your name in the voter list.</li>
          <li>Get your finger inked and sign the register.</li>
          <li>Go to the voting compartment and press the button on the **EVM**.</li>
          <li>Verify your choice on the **VVPAT** screen.</li>
        </ol>
      </div>
    )
  }
];

const VoterGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className={styles.section} id="guide">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.sidebar}>
            <h2 className={styles.title}>Voter&apos;s Journey</h2>
            <div className={styles.stepper}>
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`${styles.stepIndicator} ${index === currentStep ? styles.active : ''} ${index < currentStep ? styles.completed : ''}`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className={styles.dot}>
                    {index < currentStep ? <CheckCircle2 size={20} /> : index + 1}
                  </div>
                  <div className={styles.stepInfo}>
                    <span className={styles.stepTitle}>{step.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.main}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.content}
              >
                <h3 className={styles.contentTitle}>{steps[currentStep].title}</h3>
                <p className={styles.contentDesc}>{steps[currentStep].description}</p>
                <div className={styles.body}>
                  {steps[currentStep].content}
                </div>

                <div className={styles.navigation}>
                  <button 
                    className={styles.navBtn} 
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(prev => prev - 1)}
                  >
                    <ChevronLeft size={20} /> Previous
                  </button>
                  <button 
                    className={styles.navBtnPrimary} 
                    disabled={currentStep === steps.length - 1}
                    onClick={() => setCurrentStep(prev => prev + 1)}
                  >
                    {currentStep === steps.length - 1 ? 'Finished' : 'Next Step'} <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoterGuide;
