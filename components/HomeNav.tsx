import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './HomeNav.module.css';
import SignOut from './SignOut/SignOut';

const HomeNav: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [assistantCode, setAssistantCode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve userName and token from localStorage
    const name = localStorage.getItem('userName');
    setUserName(name);

    const fetchAvatar = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('https://boostify-back-end.vercel.app/api/whoami', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          // Extract the assistantCode and set avatar URL
          setAssistantCode(data.assistantCode);
          setAvatarUrl(data.avatarUrl || null);
        } catch (error: any) {
          console.error('Failed to fetch avatar:', error.message);
        }
      } else {
        console.warn('No token found');
      }
    };    
    
    fetchAvatar();
  }, []);

  const handleSignOut = async () => {
    try {
      // Remove token and userName from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      router.push('/SignIn');
    } catch (error: any) {
      console.error('Sign out failed:', error.message);
    } finally {
      setShowPopup(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/HomePage">
          <img src="/logo.png" alt="Boostify Logo" className={styles.logo} />
        </a>
        <nav className={styles.nav}>
          <a href="/darkmode">
            <img src="/moon.png" alt="Darkmode Logo" className={styles.dmlogo} />
          </a>
          <a href="/About" className={styles.navLink}>About</a>
          <a href="/Team" className={styles.navLink}>Our Team</a>
          {userName ? (
            <>
              <span className={styles.userName}>{userName}</span>
              <a href="#" onClick={() => setShowPopup(true)} className={styles.signOut}>Sign Out</a>
            </>
          ) : (
            <a href="/SignIn" className={styles.signIn}>Sign In</a>
          )}
          <a href="/Profile" className={styles.userAvatarButton}>
            <div
              className={styles.userAvatar}
              style={{ backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined }}
            >
              {userName && (
                <span className={styles.userNameInsideAvatar}>
                  {userName} {/* Display the first letter of the userName */}
                </span>
              )}
            </div>
          </a>
        </nav>
      </header>

      {showPopup && <SignOut onClose={() => setShowPopup(false)} onSignOut={handleSignOut} />}
    </div>
  );
};

export default HomeNav;
