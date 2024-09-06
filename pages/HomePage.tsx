import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import Link from 'next/link'; // Import Next.js Link component
import styles from './HomePage.module.css';
import Footer from '../components/Footer';
import HomeNav from '../components/HomeNav';
import { useTheme } from '../styles/ThemeContext';
import { useSession } from 'next-auth/react';

const HomePage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { data: session, status } = useSession();
  return (
    <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <HomeNav />

      <main className={styles.mainContent}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>Capture Your Smile, Capture Your Presence</h1>
          <p className={styles.description}>
           This device is an attendance system based on facial recognition technology that requires
            users to smile as a sign of presence. With just a smile, your attendance is automatically 
            recorded and enhancing the positive atmosphere in the workplace or school. Additionally, 
            this device aims to boost people`s enthusiasm and motivation to start their day with a smile, 
            creating a more positive and productive environment.
          </p>
        </div>
        <div className={styles.imageContent}>
          <Image 
            src="/smile-image.png" 
            alt="Capture Presence" 
            width={500} 
            height={500} 
            className={styles.mainImage} 
          />
        </div>
      </main>
      <section className={styles.attendanceSection}>
        <h2 className={styles.attendanceTitle}>ATTENDANCE</h2>
        <Link href="/LiveReport" passHref>
          <button className={styles.attendanceButton}>LIVE REPORT</button>
        </Link>
        <Link href="/Recap" passHref>
          <button className={styles.attendanceButton}>RECAP</button>
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
