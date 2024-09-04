import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import Navbar from '../components/Navbar';
import HomeNav from '../components/HomeNav';
import Footer from '../components/Footer';
import styles from './About.module.css';
import FeatureCard from '@/components/FeatureCard';
import { FaSmile, FaShieldAlt, FaChartLine, FaThumbsUp } from 'react-icons/fa';
import { useTheme } from '../styles/ThemeContext';

const About: React.FC = () => {
  const { data: session, status } = useSession(); // Use useSession to check authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Update isAuthenticated state based on session status
    if (status === 'authenticated') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [status]);

  return (
    <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : ''}`}>
      {/* Conditionally render HomeNav or Navbar based on isAuthenticated state */}
      {isAuthenticated ? <HomeNav /> : <Navbar />}
      
      <main className={styles.main}>
        <section className={`${styles.textCenter} ${isDarkMode ? styles['dark-mode'] : ''}`}>
          <h2>FEATURES</h2>
        </section>

        {/* First Section: How It Works */}
        <section className={`${styles.section} ${isDarkMode ? styles['dark-mode'] : ''}`}>
          <div className={`${styles.card} ${isDarkMode ? styles['dark-mode'] : ''}`}>
            <h3>HOW DOES IT WORK?</h3>
            <ul>
              <li className={`${styles.emojiColor} ${isDarkMode ? styles['dark-mode'] : ''}`}>
                <Image src="/standImg.png" alt="stand" className={styles.emoji} width={24} height={24} /> Stand in front of Boostify
              </li>
              <li className={`${styles.emojiColor} ${isDarkMode ? styles['dark-mode'] : ''}`}>
                <Image src="/smileImg.png" alt="Smile" className={styles.emoji} width={24} height={24} /> Smile to the camera
              </li>
              <li className={`${styles.emojiColor} ${isDarkMode ? styles['dark-mode'] : ''}`}>
                <Image src="/checkImg.png" alt="Check" className={styles.emoji} width={24} height={24} /> Presence completes when emoticon appears
              </li>
            </ul>
          </div>
          <Image src="/boostify-device.png" alt="Boostify Device" className={styles.imgSmall} width={300} height={200} />
        </section>

        {/* Second Section: Boostify Features */}
        <section className={`${styles.section} ${isDarkMode ? styles['dark-mode'] : ''}`}>
          <Image src="/boostify-device2.png" alt="Boostify Device2" className={styles.imgSmall} width={300} height={200} />
          <div className={`${styles.card} ${isDarkMode ? styles['dark-mode'] : ''}`}>
            <h3>BOOSTIFY FEATURES</h3>
            <ul>
              <li className={`${styles.emojiColor} ${isDarkMode ? styles['dark-mode'] : ''}`}>
                <Image src="/playImg.png" alt="Play" className={styles.emoji} width={24} height={24} /> TFT Display
              </li>
              <li className={`${styles.emojiColor} ${isDarkMode ? styles['dark-mode'] : ''}`}>
                <Image src="/playImg.png" alt="Play" className={styles.emoji} width={24} height={24} /> Web Integration
              </li>
              <li className={`${styles.emojiColor} ${isDarkMode ? styles['dark-mode'] : ''}`}>
                <Image src="/playImg.png" alt="Play" className={styles.emoji} width={24} height={24} /> Speaker
              </li>
              <li className={`${styles.emojiColor} ${isDarkMode ? styles['dark-mode'] : ''}`}>
                <Image src="/playImg.png" alt="Play" className={styles.emoji} width={24} height={24} /> Anti Spoofing Protection
              </li>
            </ul>
          </div>
        </section>

        {/* Vertical Feature Cards */}
        <section className={`${styles.featureCardsWrapper} ${isDarkMode ? styles['dark-mode'] : ''}`}>
          <div className={`${styles.featureCards} ${isDarkMode ? styles['dark-mode'] : ''}`}>
            <FeatureCard
              title="Happiness and Productivity"
              description="Smiles have a positive effect on mood and productivity. BOOSTIFY integrates happiness in the attendance process."
              icon={<FaSmile size={30} color="#7D0A0A" />}
            />
            <FeatureCard
              title="High Security"
              description="Anti-spoofing system ensures the security of attendance data with advanced facial recognition technology."
              icon={<FaShieldAlt size={30} color="#7D0A0A" />}
            />
            <FeatureCard
              title="Ease of Monitoring"
              description="Live reports and attendance data recap make it easy for management to monitor attendance in real-time."
              icon={<FaChartLine size={30} color="#7D0A0A" />}
            />
            <FeatureCard
              title="Positive Feedback"
              description="A pleasant feedback voice makes the attendance process a positive and motivating experience."
              icon={<FaThumbsUp size={30} color="#7D0A0A" />}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
