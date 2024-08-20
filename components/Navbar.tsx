import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    const newTheme = !isDarkMode ? 'dark' : 'light';
    document.body.classList.toggle('dark-mode', !isDarkMode);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="/">
          <img src="/logo.png" alt="Boostify Logo" className={styles.logo} />
        </a>
      </div>
      <div className={styles.navbarContainer}>
        <div className={styles.navLinks}>
          {/* Dark mode toggle */}
          <img
            src="/moon.png"
            alt="Darkmode Logo"
            className={styles.dmlogo}
            onClick={toggleDarkMode}
            style={{ cursor: 'pointer' }}
          />
          <a href="/About" className={styles.navLink}>About</a>
          <a href="/Team" className={styles.navLink}>Our Team</a>
          <a href="/SignIn" className={styles.signIn}>Sign In</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
