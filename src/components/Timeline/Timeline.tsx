'use client';

import React, { useState } from 'react';
import styles from './Timeline.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, UserCheck, Search, XCircle, Megaphone, Vote, BarChart3, Trophy } from 'lucide-react';

import { generateGoogleCalendarLink } from '@/lib/calendar';

interface Phase {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  date: string; // YYYY-MM-DD
}

const phases: Phase[] = [
  {
    id: 'notification',
    title: 'Notification',
    icon: <Calendar size={24} />,
    description: 'The Election Commission issues the formal notification for the election.',
    details: [
      'Sets the schedule for all subsequent stages.',
      'Model Code of Conduct (MCC) comes into immediate effect.',
      'Election observers are appointed.'
    ],
    date: '2026-05-15'
  },
  {
    id: 'nominations',
    title: 'Nominations',
    icon: <UserCheck size={24} />,
    description: 'Candidates file their nomination papers to contest the election.',
    details: [
      'Candidates must submit affidavits disclosing assets and criminal records.',
      'Security deposits are paid.',
      'Proposers must sign the nomination forms.'
    ],
    date: '2026-05-22'
  },
  {
    id: 'scrutiny',
    title: 'Scrutiny',
    icon: <Search size={24} />,
    description: 'Returning Officers examine nomination papers for validity.',
    details: [
      'Incomplete or incorrect forms are rejected.',
      'Opposing candidates can raise objections.',
      'Validly nominated candidates list is published.'
    ],
    date: '2026-05-23'
  },
  {
    id: 'withdrawal',
    title: 'Withdrawal',
    icon: <XCircle size={24} />,
    description: 'Candidates have a final chance to withdraw their names.',
    details: [
      'Prevents splitting of votes within parties.',
      'Final list of contesting candidates is prepared.',
      'Election symbols are allotted to independent candidates.'
    ],
    date: '2026-05-25'
  },
  {
    id: 'campaigning',
    title: 'Campaigning',
    icon: <Megaphone size={24} />,
    description: 'Candidates and parties reach out to voters.',
    details: [
      'Public rallies, manifestos, and door-to-door visits.',
      'Strict adherence to MCC and expenditure limits.',
      'Campaigning must stop 48 hours before polling ends.'
    ],
    date: '2026-06-01'
  },
  {
    id: 'polling',
    title: 'Polling Day',
    icon: <Vote size={24} />,
    description: 'The most critical day when citizens cast their votes.',
    details: [
      'Voting via EVMs or ballot papers.',
      'Polling stations are set up across constituencies.',
      'Identity verification (Voter ID/EPIC) is mandatory.'
    ],
    date: '2026-06-15'
  },
  {
    id: 'counting',
    title: 'Counting',
    icon: <BarChart3 size={24} />,
    description: 'Votes are counted under strict supervision.',
    details: [
      'Done in presence of candidates or their agents.',
      'Round-by-round tallying for each constituency.',
      'VVPAT slips may be verified if necessary.'
    ],
    date: '2026-06-18'
  },
  {
    id: 'results',
    title: 'Results',
    icon: <Trophy size={24} />,
    description: 'Declaration of winners and formation of the house.',
    details: [
      'Winners receive the certificate of election.',
      'The government formation process begins.',
      'Final election report is submitted to the President/Governor.'
    ],
    date: '2026-06-20'
  }
];

const Timeline: React.FC = () => {
  const [activePhase, setActivePhase] = useState<Phase>(phases[0]);

  const handleAddToCalendar = () => {
    const link = generateGoogleCalendarLink(
      `Election Phase: ${activePhase.title}`,
      activePhase.description,
      activePhase.date
    );
    window.open(link, '_blank');
  };

  return (
    <section className={styles.section} id="timeline">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Election Journey</h2>
          <p className={styles.sectionSubtitle}>Click on any phase to explore the details of the process.</p>
        </div>

        <div className={styles.timelineWrapper}>
          <div className={styles.timelineNav}>
            {phases.map((phase, index) => (
              <div 
                key={phase.id} 
                className={`${styles.navItem} ${activePhase.id === phase.id ? styles.active : ''}`}
                onClick={() => setActivePhase(phase)}
              >
                <div className={styles.iconWrapper}>
                  {phase.icon}
                </div>
                <span className={styles.navTitle}>{phase.title}</span>
                {index < phases.length - 1 && <div className={styles.connector} />}
              </div>
            ))}
          </div>

          <div className={styles.contentCard}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={styles.phaseContent}
              >
                <div className={styles.phaseHeader}>
                  <div className={styles.largeIcon}>
                    {activePhase.icon}
                  </div>
                  <div className={styles.titleInfo}>
                    <h3 className={styles.phaseTitle}>{activePhase.title}</h3>
                    <p className={styles.phaseDesc}>{activePhase.description}</p>
                  </div>
                  <button 
                    className={styles.calendarBtn}
                    onClick={handleAddToCalendar}
                  >
                    <Calendar size={18} />
                    Add to Google Calendar
                  </button>
                </div>

                <div className={styles.detailsGrid}>
                  <h4 className={styles.detailsTitle}>Key Steps & Rules:</h4>
                  <ul className={styles.detailsList}>
                    {activePhase.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
