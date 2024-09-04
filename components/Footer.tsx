import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import styles from './Footer.module.css';
import { useTheme } from '../styles/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`${styles.footer} ${isDarkMode ? styles['dark-mode'] : ''}`}>
      <div className={`${styles.footerLinks} ${isDarkMode ? styles['dark-mode'] : ''}`}>
        <Link href="/About" className={`${styles.footerLink} ${isDarkMode ? styles['dark-mode'] : ''}`}>
          About
        </Link>
        <Link href="/Team" className={`${styles.footerLink} ${isDarkMode ? styles['dark-mode'] : ''}`}>
          Team
        </Link>
        <Link href="mailto:info@boostify.com" className={`${styles.footerLink} ${isDarkMode ? styles['dark-mode'] : ''}`}>
          <Image src="/email-icon.png" alt="Email Icon" className={styles.footerIcon} width={24} height={24} />
        </Link>
        <Link href="https://www.linkedin.com/company/boostify" className={`${styles.footerLink} ${isDarkMode ? styles['dark-mode'] : ''}`}>
          <Image src="/linkedin-icon.png" alt="LinkedIn Icon" className={styles.footerIcon} width={24} height={24} />
        </Link>
      </div>
      <div className={styles.logoContainer}>
        <Image src="/Boostify-cps.png" alt="Boostify Logo" className={styles.logo} width={100} height={50} />
      </div>
      <p className={`${styles.footerText} ${isDarkMode ? styles['dark-mode'] : ''}`}>© 2021 All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
