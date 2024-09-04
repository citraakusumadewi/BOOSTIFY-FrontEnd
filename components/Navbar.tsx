import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component from Next.js
import styles from './Navbar.module.css';
import { useTheme } from '../styles/ThemeContext';

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
        <Link href="/" passHref>
          <Image
            src="/logo.png"
            alt="Boostify Logo"
            className={styles.logo}
            width={100} // Adjust width as needed
            height={50}  // Adjust height as needed
          />
        </Link>
      </div>
      <nav className={styles.navbarContainer}>
        <button onClick={toggleMode} className={styles.modeToggle}>
          <Image
            src={isDarkMode ? "/light-mode-icon.png" : "/moon.png"}
            alt={isDarkMode ? "Light Mode Icon" : "Dark Mode Icon"}
            width={24} // Adjust width as needed
            height={24} // Adjust height as needed
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
          <li><Link href="/About"className={styles.navLink}>About</Link></li>
          <li><Link href="/Team" className={styles.navLink}>Our Team</Link></li>
          <li><Link href="/SignIn"className={`${styles.navLink} ${styles.signIn}`}>Sign In</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
