import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useTheme } from '../pages/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleMode } = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu Toggled:', isMenuOpen); // Debugging log
  };

  return (
    <header className={`${styles.header} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <div className={styles.logoContainer}>
        <a href="/">
          <img src="/logo.png" alt="Boostify Logo" className={styles.logo} />
        </a>
      </div>
      <nav className={styles.navbarContainer}>
        <button onClick={toggleMode} className={styles.modeToggle}>
          <img
            src={isDarkMode ? "/light-mode-icon.png" : "/moon.png"}
            alt={isDarkMode ? "Light Mode Icon" : "Dark Mode Icon"}
            style={{ cursor: 'pointer' }}
          />
        </button>
        {/* Hamburger Menu for small screens */}
        <button className={styles.hamburger} onClick={handleMenuToggle}>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
        {/* Navbar Links */}
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
          <li><a href="/About" className={styles.navLink}>About</a></li>
          <li><a href="/Team" className={styles.navLink}>Our Team</a></li>
          <li><a href="/SignIn" className={`${styles.navLink} ${styles.signIn}`}>Sign In</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
