import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <a href="/About" className={styles.footerLink}>About</a>
        <a href="/Team" className={styles.footerLink}>Team</a>
        <a href="mailto:info@boostify.com" className={styles.footerLink}>
          <img src="/email-icon.png" alt="Email Icon" className={styles.footerIcon} />
        </a>
        <a href="https://www.linkedin.com/company/boostify" className={styles.footerLink}>
          <img src="/linkedin-icon.png" alt="LinkedIn Icon" className={styles.footerIcon} />
        </a>
      </div>
      <div className={styles.logoContainer}>
        <img src="/Boostify-cps.png" alt="Boostify Logo" className={styles.logo} />
      </div>
      <p className={styles.footerText}>© 2021 All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
