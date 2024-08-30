import React from 'react';
import styles from './Footer.module.css';
import { useTheme } from '../pages/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`${styles.footer} ${isDarkMode ? styles['dark-mode'] : ''}`}>
      <div className={`${styles.footerLinks} ${isDarkMode ? styles['dark-mode'] : ''}`}>
        <a href="/About" className={`${styles.footerLink} ${isDarkMode ? styles['dark-mode'] : ''}`}>About</a>
        <a href="/Team" className={`${styles.footerLink} ${isDarkMode ? styles['dark-mode'] : ''}`}>Team</a>
        <a href="mailto:info@boostify.com" className={`${styles.footerLink} ${isDarkMode ? styles['dark-mode'] : ''}`}>
          <img src="/email-icon.png" alt="Email Icon" className={styles.footerIcon} />
        </a>
        <a href="https://www.linkedin.com/company/boostify" className={`${styles.footerLink} ${isDarkMode ? styles['dark-mode'] : ''}`}>
          <img src="/linkedin-icon.png" alt="LinkedIn Icon" className={styles.footerIcon} />
        </a>
      </div>
      <div className={styles.logoContainer}>
        <img src="/Boostify-cps.png" alt="Boostify Logo" className={styles.logo} />
      </div>
      <p className={`${styles.footerText} ${isDarkMode ? styles['dark-mode'] : ''}`}>© 2021 All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
