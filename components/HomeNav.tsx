import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../pages/ThemeContext'; // Import ThemeContext
import styles from './HomeNav.module.css';
import SignOut from './SignOut/SignOut';
import { signOut } from 'next-auth/react';

const HomeNav: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [assistantCode, setAssistantCode] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { isDarkMode, toggleMode } = useTheme(); // Use theme context

  useEffect(() => {
    const fetchUserData = async () => {
      // Ambil data dari localStorage
      const authDataString = localStorage.getItem('authData');
      console.log('Retrieved authData from localStorage:', authDataString);

      if (authDataString) {
        // Parse data dari string menjadi objek
        const authData = JSON.parse(authDataString);

        // Ambil token dari authData
        const token = authData.token.token; // Sesuaikan dengan struktur data Anda
        console.log('Extracted token:', token);

        if (token) {
          try {
            const response = await fetch('https://boostify-back-end.vercel.app/api/whoami', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              if (response.status === 401) {
                console.warn('Token invalid, redirecting to SignIn');
                localStorage.removeItem('authData');
                router.push('/SignIn');
              } else {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
              }
            }

            const data = await response.json();
            console.log('Fetched user data:', data);
            setUserName(data.name);
            setAssistantCode(data.assisstant_code);
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        } else {
          console.warn('No token found in authData');
        }
      } else {
        console.warn('No authData found');
      }
    };

    fetchUserData();
  }, [router]);

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('authData');
      localStorage.removeItem('nextauth.message');
      console.log('Sign out successful, session and token removed');

      await signOut({ callbackUrl: '/SignIn' });
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setShowPopup(false);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu Toggled:', isMenuOpen); // Debugging log
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <header className={`${styles.header} ${isDarkMode ? styles['dark-mode'] : styles['light-mode']}`}>
        <a href="/HomePage">
          <img src="/logo.png" alt="Boostify Logo" className={styles.logo} />
        </a>
        <nav className={styles.nav}>
          <button onClick={toggleMode} className={styles.modeToggle}>
            <img
              src={isDarkMode ? "/light-mode-icon.png" : "/moon.png"}
              alt={isDarkMode ? "Light Mode Icon" : "Dark Mode Icon"}
              className={styles.dmlogo}
            />
          </button>
          <a href="/About" className={styles.navLink}>About</a>
          <a href="/Team" className={styles.navLink}>Our Team</a>
          <div className={styles.userSection}>
            {userName && (
              <>
                <span className={styles.userName}>{userName}</span>
                <a href="#" onClick={() => setShowPopup(true)} className={styles.signOut}>Sign Out</a>
              </>
            )}
            <a href="/Profile" className={styles.userAvatarButton}>
              <div className={styles.userAvatar}>
                {assistantCode && (
                  <span className={styles.assistantCode}>{assistantCode}</span>
                )}
              </div>
            </a>
          </div>
        </nav>
      </header>

      {showPopup && <SignOut onClose={() => setShowPopup(false)} onSignOut={handleSignOut} />}
    </div>
  );
};

export default HomeNav;
