import Hero from '@/components/Hero/Hero';
import Timeline from '@/components/Timeline/Timeline';
import VoterGuide from '@/components/VoterGuide/VoterGuide';
import Assistant from '@/components/Assistant/Assistant';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Timeline />
      <VoterGuide />
      
      {/* Floating Assistant */}
      <Assistant />

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.brand}>
              <h2 className={styles.footerLogo}>CivicPulse</h2>
              <p>Empowering citizens with AI-driven civic knowledge.</p>
            </div>
            <div className={styles.links}>
              <div className={styles.linkGroup}>
                <h4>Resources</h4>
                <a href="#">Election Commission</a>
                <a href="#">Voter Portal</a>
                <a href="#">Know your Candidate</a>
              </div>
              <div className={styles.linkGroup}>
                <h4>Support</h4>
                <a href="#">FAQs</a>
                <a href="#">Help Desk</a>
                <a href="#">Contact Us</a>
              </div>
            </div>
          </div>
          <div className={styles.bottomBar}>
            <p>&copy; 2026 CivicPulse. Built for the Google Antigravity Challenge.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
